import React from 'react';
import { useRouter } from 'next/router';

export default function LogoutScreen() {
  const router = useRouter();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login')
      console.log('This will run after 2 seconds!')
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
    return (
        <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <div className="logoutScreen">
            <section className="logoArea">
              <img src="https://alurakut.vercel.app/logo.svg" />
    
              <p><big>Você foi <strong>desconectada(o)</strong>.</big></p>
              <p>Faça novo <a href={`/login`}><strong>login</strong></a> para acessar novamente.</p>
            </section>
    
            <footer className="footerArea">
              <p>
                © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
              </p>
            </footer>
          </div>
        </main>
  )
} 

