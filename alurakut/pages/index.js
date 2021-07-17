import React from 'react';
import nookies from 'nookies';
import jsonwebtoken from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';


const baseUrl = 'http://localhost:3000';

const ProfileSidebar = (properties) => {
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

const ProfileRelationsBox = (properties) => {
  return (
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">{properties.title} ({properties.items.length})</h2>
    <ul>
      {properties.items.slice(0,6).map((eachItem) => {
        return (
          <li key={eachItem.id}>
            <a href={`${eachItem.url}`} >
              <img src={`${eachItem.avatar_url}`} />
              <span>{eachItem.login}</span>
            </a>  
          </li>
        )
      })}
    </ul>
  </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const currentUser = props.githubUser;
  const [comunidades, setCommunities] = React.useState([]);
  const [pessoasFavoritas, setPessoasFavoritas] = React.useState([
    {
      id: 0,
      title: 'juunegreiros',
      avatar_url: 'https://github.com/juunegreiros.png',
      url: 'https://github.com/juunegreiros',
    },
    {
      id: 1,
      title: 'omariosouto',
      avatar_url: 'https://github.com/omariosouto.png',
      url: 'https://github.com/omariosouto',
    },
    {
      id: 2,
      title: 'marcobrunodev',
      avatar_url: 'https://github.com/marcobrunodev.png',
      url: 'https://github.com/marcobrunodev',
    },
    {
      id: 3,
      title: 'im-usb',
      avatar_url: 'https://github.com/im-usb.png',
      url: 'https://github.com/im-usb',
    },
    {
      id: 4,
      title: 'sanramu93',
      avatar_url: 'https://github.com/sanramu93.png',
      url: 'https://github.com/sanramu93',
    },
    {
      id: 5,
      title: 'felipefialho',
      avatar_url: 'https://github.com/felipefialho.png',
      url: 'https://github.com/felipefialho',
    },
    {
      id: 6,
      title: 'rafaballerini',
      avatar_url: 'https://github.com/rafaballerini.png',
      url: 'https://github.com/rafaballerini',
    },
    {
      id: 7,
      title: 'peas',
      avatar_url: 'https://github.com/peas.png',
      url: 'https://github.com/peas',
    },
  ])
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(() => {
    // GET from GitHub
    fetch('https://api.github.com/users/deborahsalves/followers')
    .then((serverResponse) => {
      return serverResponse.json();
    })
    .then((fullResponse) => {
      setSeguidores(fullResponse);
    })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      // config obj
      method: 'POST',
      headers: {
        'Authorization': '8c3b719b562f7eba887d06bc909207',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 'query': `query {
          allCommunities {
            id
            title
            avatarUrl
            url
          }
        }`
      })
    })
    .then((serverResponse) => serverResponse.json())
    .then((fullResponse) => {
      const communitiesFromDato = fullResponse.data.allCommunities;
      setCommunities(communitiesFromDato);
    })
  }, [])

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
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();
              const dataFromForm = new FormData(e.target);

              const community = {
                // id: new Date().toISOString(),
                title: dataFromForm.get('title'),
                avatarUrl: dataFromForm.get('image'),
                url: dataFromForm.get('url')
              }
              
              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(community),
              })
              .then(async (response) => {
                const data = await response.json();
                const community = data.myRecord;
                const updatedCommunities = [...comunidades, community];
                setCommunities(updatedCommunities);
                })
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
                  placeholder="Coloque uma URL da foto para usar de capa" 
                  name="image" 
                  aria-label="Coloque uma URL da foto para usar de capa"
                  type="text" />
              </div>
              <div>
                <input 
                  placeholder="Insira o link da comunidade" 
                  name="url" 
                  aria-label="Insira o link da comunidade"
                  type="text" />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores}/>
          <ProfileRelationsBox title="FavPpl da Programação" items={pessoasFavoritas}/>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.slice(0,6).map((community) => {
                return (
                  <li key={community.id}>
                    <a href={`${community.url}`} >
                    <img src={`${community.avatarUrl}`} />
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


export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  console.log('Decoding', jsonwebtoken.decode(token))

  const { isAuthenticated } = await fetch(`${baseUrl}/api/auth`, {
    headers: {
      Authorization: token
    }
  })
  .then((response) => response.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jsonwebtoken.decode(token);

  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}
