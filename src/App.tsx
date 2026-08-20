import Header from "./components/Header";
import Hero from "./components/Hero";
import Beneficios from "./components/Beneficios";

export default function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Beneficios />
      </main>
    </div>
  );
}
