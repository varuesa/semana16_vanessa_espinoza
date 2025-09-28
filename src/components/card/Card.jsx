import { useState } from "react";

export const Card = ({ titulo = "Titulo de la publicacion", descripcion }) => {
    const desDefault = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo possimus voluptates qui, iste quis recusandae dolore optio fuga distinctio vel iusto dolorem est odio rem quo, impedit praesentium veritatis ab.";

    const [likes, setLikes] = useState(0);
    const handleLike = () => setLikes((v) => v + 1);

    const [comentarios, setComentarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState("");

   const handleAddComentario = () => {
    if (nuevoComentario.trim() !== "") {
      setComentarios([...comentarios, nuevoComentario]);
      setNuevoComentario("");
      setShowModal(false);
    }
  };


    return (
        <article className='w-full border border-gray-200 shadow-sm rounded-2xl'>
            <header className='flex justify-between items-center p-2'>
                <div className='flex justify-start items-center gap-3'>
                    <img src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
                        className='w-12 rounded-full object-cover border border-gray-400'
                        alt="perfil del usuario" />
                    <div className='flex flex-col justify-start'>
                        <span>Usuario desconocido</span>
                        <small>emiluk@example.com</small>
                    </div>
                </div>
                <div className='flex flex-col items-end'>
                    <span className="font-semibold">{titulo}</span>
                    <small>Publicado el 20/06/2024</small>
                </div>
            </header>
            <div className='p-3'>
                <p>{descripcion ? descripcion : desDefault}</p>
            </div>
            <footer>
                <div className='flex justify-start items-center gap-3 p-2 border-t border-gray-200' >
                    <button className='bg-cyan-500 text-white px-3 py-1 rounded-xl cursor-pointer hover:bg-cyan-600 transition-colors' onClick={handleLike} >❤️ Me gusta  ({likes}) </button>
                    <button className='bg-cyan-500 text-white px-3 py-1 rounded-xl cursor-pointer hover:bg-cyan-600 transition-colors' onClick={() => setShowModal(true)}>📰 Comentarios ({comentarios.length})</button>
                </div>
            </footer>



            {comentarios.length > 0 && (
                <div className="border-t border-gray-200 p-2">
                    <h4 className="font-semibold mb-2">Comentarios:</h4>
                    <ul className="list-disc ml-6">
                        {comentarios.map((c, i) => (
                            <li key={i}>{c}</li>
                        ))}
                    </ul>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-gray bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-96">
                        <h3 className="text-lg font-bold mb-3">Nuevo comentario</h3>
                        <textarea
                            className="w-full border rounded-lg p-2 mb-3"
                            rows="3"
                            value={nuevoComentario}
                            onChange={(e) => setNuevoComentario(e.target.value)}
                            placeholder="Escribe tu comentario..."
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="px-3 py-1 rounded bg-cyan-500 text-white hover:bg-cyan-600"
                                onClick={handleAddComentario}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </article>



    )
}