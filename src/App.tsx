import Header from "./components/Header";
import Hero from "./components/Hero";
import Beneficios from "./components/Beneficios";
import Servicios from "./components/Servicios";
import Marcas from "./components/Marcas";

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Beneficios />
        <Servicios />
        <Marcas />
      </main>
    </div>
  );
}
