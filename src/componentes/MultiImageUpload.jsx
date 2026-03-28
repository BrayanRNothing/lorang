import { useState, useRef } from 'react';

export default function MultiImageUpload({ images = [], onChange, maxImages = 6 }) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFileInput = (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if (images.length + imageFiles.length > maxImages) {
            alert(`Solo puedes subir hasta ${maxImages} imágenes`);
            return;
        }

        // Convertir archivos a URLs temporales para preview
        const newImages = imageFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            isNew: true
        }));

        onChange([...images, ...newImages]);
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        onChange(newImages);
    };

    const handleUrlAdd = () => {
        const url = prompt('Ingresa la URL de la imagen:');
        if (url && url.trim()) {
            if (images.length >= maxImages) {
                alert(`Solo puedes tener hasta ${maxImages} imágenes`);
                return;
            }
            onChange([...images, { url: url.trim(), isNew: false }]);
        }
    };

    return (
        <div className="space-y-4">
            {/* Drop Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-200
          ${isDragging
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-neutral-700 hover:border-blue-500 bg-neutral-800/50 hover:bg-neutral-800'
                    }
        `}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                />

                <div className="flex flex-col items-center gap-3">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>

                    <div>
                        <p className="text-white font-semibold mb-1">
                            {isDragging ? '¡Suelta las imágenes aquí!' : 'Arrastra imágenes o haz click'}
                        </p>
                        <p className="text-sm text-gray-400">
                            PNG, JPG, WebP hasta 10MB ({images.length}/{maxImages})
                        </p>
                    </div>
                </div>
            </div>

            {/* Botón para agregar URL */}
            <button
                type="button"
                onClick={handleUrlAdd}
                className="w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Agregar imagen por URL
            </button>

            {/* Preview de imágenes */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="relative group aspect-square bg-neutral-800 rounded-lg overflow-hidden border-2 border-neutral-700 hover:border-blue-500 transition-all"
                        >
                            <img
                                src={img.preview || img.url || img}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                            />

                            {/* Badge de principal */}
                            {index === 0 && (
                                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                    Principal
                                </div>
                            )}

                            {/* Botón eliminar */}
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Overlay en hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
                        </div>
                    ))}
                </div>
            )}

            {images.length === 0 && (
                <p className="text-center text-gray-500 text-sm py-4">
                    No hay imágenes. Agrega al menos una imagen principal.
                </p>
            )}
        </div>
    );
}
