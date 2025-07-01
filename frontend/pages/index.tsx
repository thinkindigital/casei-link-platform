import React from 'react';
// IMPORTANTE: O caminho abaixo pode precisar de um pequeno ajuste.
// Verifique na sua pasta `frontend/components/plasmic/` o nome exato do seu projeto e do seu componente.
import { PlasmicHomepage } from '../components/plasmic/casei_link_platform/PlasmicHomepage';
import { useRouter } from 'next/router';

function Homepage() {
  const router = useRouter();

  // O Plasmic pode precisar de parâmetros da URL para funcionar corretamente,
  // então passamos todos eles para o componente.
  return <PlasmicHomepage {...(router.query as any)} />;
}

export default Homepage;