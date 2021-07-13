import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

const ProfileSidebar = (properties) => {
  console.log(properties)
  return (
    <Box as="aside">
      <img src={`https://github.com/${properties.githubUser}.png`} style={{ borderRadius: '8px'}}/>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${properties.githubUser}`}>
          @{properties.githubUser}
        </a>
      </p>
      <hr/>

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  React.useState();
  const currentUser = 'deborahsalves';
  const [comunidades, setCommunity] = React.useState([{
    id: '0initial',
    title: 'Initial Community',
    image: 'http://placehold.it/300x300'
  }]);
  const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'peas', 'rafaballerini', 'marcobrunodev', 'felipefialho', 'im-usb', 'sanramu93']

  return ( 
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={currentUser}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem-vinda(o)</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subtitle">O que você deseja fazer</h2>

            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();
              const dataFromForm = new FormData(e.target);

              const community = {
                id: new Date().toISOString(),
                title: dataFromForm.get('title'),
                image: dataFromForm.get('image'),
              }
              
              const updatedCommunities = [...comunidades, community];
              setCommunity(updatedCommunities);
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text" />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usar de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usar de capa"
                  type="text" />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">FavPpl da programação ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((person) => {
                return (
                  <li key={person}>
                    <a href={`/users/${person}`} >
                      <img src={`https://github.com/${person}.png`} />
                      <span>{person}</span>
                    </a>  
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((community) => {
                return (
                  <li key={community.id}>
                    <a href={`/users/${community.title}`} >
                    <img src={community.image} />
                      <span>{community.title}</span>
                    </a>  
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
    )
}