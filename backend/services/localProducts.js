import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.resolve(__dirname, '../data');
const DATA_PATH = path.join(DATA_DIR, 'products.json');

function safeRead() {
  try {
    if (!fs.existsSync(DATA_PATH)) return [];
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr;
    return [];
  } catch (e) {
    console.error('localProducts: error reading JSON', e);
    return [];
  }
}

function safeWrite(list) {
  try {
    // Ensure directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const json = JSON.stringify(list, null, 2);
    fs.writeFileSync(DATA_PATH, json, 'utf-8');
    return true;
  } catch (e) {
    console.error('localProducts: error writing JSON', e);
    return false;
  }
}

function genId() {
  return (
    Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8)
  );
}

export async function findAll() {
  const list = safeRead();
  let changed = false;
  for (let i = 0; i < list.length; i++) {
    const p = list[i];
    if (!p.id && !p._id) {
      p.id = genId();
      changed = true;
    }
  }
  if (changed) safeWrite(list);
  return list.map((p) => ({ id: String(p.id || p._id), ...p }));
}

export async function findById(id) {
  const list = await findAll();
  return list.find((p) => String(p.id) === String(id)) || null;
}

export async function create(doc) {
  const list = safeRead();
  const id = genId();
  const nuevo = {
    id,
    nombre: doc.nombre,
    descripcion: doc.descripcion,
    precio: doc.precio,
    imagen: doc.imagen,
    images: Array.isArray(doc.images) && doc.images.length > 0 ? doc.images : [doc.imagen],
    category: doc.category || 'all',
  };
  list.push(nuevo);
  const ok = safeWrite(list);
  if (!ok) throw new Error('No se pudo escribir el archivo JSON');
  return nuevo;
}

export async function removeById(id) {
  const list = safeRead();
  const idx = list.findIndex((p) => String(p.id || p._id) === String(id));
  if (idx === -1) return false;
  list.splice(idx, 1);
  return safeWrite(list);
}

export function dataPath() {
  return DATA_PATH;
}
