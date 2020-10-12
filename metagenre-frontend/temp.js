const getMediumsGenresMultiple = (() => {

    const userPickedContainer = [];

    fetch(`${backendUrl}/userBooleanRelationships?userId=${loggedIn.id}&genreId=${genre.id}`)
        .then(response => response.json())
        .then(response => {
            console.log(response.data)
            if (response.data !== undefined) {
                response.data.forEach(item => {
                    userPickedContainer.push(item.genreId);
                })
            }
        });

    const mediumsGenresContainer = [];

    fetch(`${backendUrl}/genreSubgenresDesc?genreId${genre.id}`)
        .then(response => response.json())
        .then(response => {
            if (userPickedContainer.length > 0) {

                let i = 0;
                let found;
                let userVoted;

                response.data.forEach(item => {

                    found = userPickedContainer.find(element => element == item.subgenreId);

                    console.log('FOUND')
                    console.log(found)
                    userVoted = (found !== undefined) ? 1 : 0;

                    let content = {
                        id: item.id,
                        title: item.title,
                        name: item.name,
                        votes: item.votes,
                        voted: userVoted
                    }

                    content.subgenreId = item.subgenreId;

                    mediumsGenresContainer.push(content);
                })

                setGenresSubgenres(mediumsGenresContainer)

                setUserPickedSubgenresLength(userPickedContainer.length);

            } else {

                setGenresSubgenres(response.data)

                setUserPickedSubgenresLength(3);

            }
        });

    console.log('/////////////')
    console.log(mediumsGenresContainer)

});
