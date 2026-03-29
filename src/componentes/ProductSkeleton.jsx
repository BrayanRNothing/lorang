export default function ProductSkeleton() {
	return (
		<div className="group relative mx-auto flex w-full max-w-[18rem] flex-col overflow-hidden rounded-md border border-slate-300 bg-white animate-pulse">
			{/* Imagen placeholder */}
			<div className="relative w-full aspect-[4/3] bg-slate-200" />

			{/* Contenido placeholder */}
			<div className="flex flex-col flex-1 p-3 sm:p-4 gap-2.5">
				{/* Título */}
				<div className="h-4 w-3/4 bg-slate-200 rounded" />
				{/* Descripción líneas */}
				<div className="space-y-2">
					<div className="h-3 w-full bg-slate-200 rounded" />
					<div className="h-3 w-5/6 bg-slate-200 rounded" />
				</div>
				{/* Precio */}
				<div className="mt-1 h-5 w-24 bg-slate-200 rounded" />
				{/* Botón */}
				<div className="mt-auto h-10 w-full bg-slate-200 rounded-md" />
			</div>
			<span className="sr-only">Cargando producto…</span>
		</div>
	);
}

