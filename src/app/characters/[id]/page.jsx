import CharacterExpandedComponent from "../../../../components/CharacterExpanded/CharacterExpanded";


async function fetchOneCharacter(id){
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await res.json();
    /* console.log(data); */
    return data
    
}

async function OneCharacter({params}) {

    const character = await fetchOneCharacter(params.id);
    /* console.log(character); */
    return (  
        <section>
            <CharacterExpandedComponent character={character} />
        </section>
    );
}

export default OneCharacter;