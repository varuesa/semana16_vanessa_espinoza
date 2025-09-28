import { use, useEffect, useState } from 'react'
import { Nav } from '../../components/nav/Nav';
import { Card } from '../../components/card/Card';

export const Post = () => {
    /* Obtener las publicaciones */
    const [posts, setPosts] = useState([]);
    const PAGE_RIZE = 10;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasmore, setHasmore] = useState(true);

    useEffect(() => {
        const ObtenerPublicaciones = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${PAGE_RIZE}&_page=${page}`);
                console.log("Pagina: ", page);
                const data = await response.json();

                if (data.length === 0) {
                    setHasmore(false); // no hay mas publicaciones
                } else {
                    setPosts(prevPosts => [...prevPosts, ...data]); // agregar nuevas publicaciones al estado
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false); // cambiar el estado de carga a falso
            }
        }

        ObtenerPublicaciones();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (document.getElementById('section-post').scrollTop + document.getElementById('section-post').clientHeight >= document.getElementById('section-post').scrollHeight - 200 && !loading && hasmore) {
                setPage(prevPage => prevPage + 1);
            }
        }

       /*  window.addEventListener('scroll', handleScroll); */ /* Agrega el evento de desplazamiento */
        document.getElementById('section-post').addEventListener('scroll', handleScroll); /* Agrega el evento de desplazamiento al contenedor */
        return () => document.getElementById('section-post').removeEventListener('scroll', handleScroll); // Limpia el evento de desplazamiento
    }, [loading, hasmore]);

    return (
        <div className="text-cyan-900 bg-gradient-to-r from-sky-100 to-zinc-50 w-screen h-screen">
            <div className="flex justify-center items-center h-full">
                <div className="w-[1400px] h-[900px] bg-white/85 rounded-2xl shadow-xl">
                    <div className="w-full h-full rounded-2xl grid grid-cols-4">
                        <Nav />
                        <main className="col-span-3 rounded-br-2xl rounded-tr-2xl p-5 bg-gray-50">
                            <h2 className="text-3xl mb-2">Publicaciones</h2>
                            <section id='section-post' className='flex flex-col gap-5 overflow-y-auto h-[790px] p-2 py-4'>
                                {posts.map(post => (
                                    <Card key={post.id} titulo={post.title} descripcion={post.body} />
                                ))}

                                {loading && <p className='text-center'>Cargando...</p>}
                                {!hasmore && <p className='text-center'>No hay más publicaciones</p>}
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}