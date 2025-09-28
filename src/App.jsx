import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Contact } from './pages/contact/Contact';
import { Post } from './pages/post/Post';
import { Nav } from './components/nav/Nav';

function App() {

    return (
        <>
            <BrowserRouter>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </BrowserRouter>

        </>
    )
}


export default App;


