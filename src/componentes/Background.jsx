import fondo from '../pics/fondo.jpg';

export default function Background ({children}) {
    return (
        <div className='absolute top-0 left-0 w-full min-h-screen bg-center bg-cover bg-neutral-950 -z-10'>
            {children}
        </div>
    );
};
