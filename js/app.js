document.addEventListener('DOMContentLoaded', () => {


    /* 
    Déclaration
    */
        const form = document.querySelector('form');
        const userMessage = document.querySelector('textarea');
        const messages = document.querySelector('#messages');
    //


    /* 
    Gestion de la donnée
    */
        // Définir la BDD PouchDB
        const pouchDatabase = new PouchDB('hetic-chat');

        // Définir la BDD CouchDB
        const couchDatabase = 'https://ldp.dwsapp.io/md4-chat';

        // Création d'une méthode pour synchroniser PouchDB et CouchDB
        const syncDatabases = () => {
            // From Pouch to Couch
            pouchDatabase.replicate.to( couchDatabase, { live: true }, (err) => console.log(err)  );
            // from COuch to Pouch
            pouchDatabase.replicate.from( couchDatabase, { live: true }, (err) => console.log(err)  );
        }

        // Fonction pour ajouter un message dans le DOM
        const fetchMessages = () => {
            messages.innerHTML = ''
            pouchDatabase.allDocs( { include_docs: true }, ( err, data ) => {
                err ? console.error(err) : data.rows.map( item => messages.innerHTML += `<p>${item.doc.content}</p>` ) ;
            });
        };

        // Configurer la synchronisation
        pouchDatabase.changes({
            since: 'now',
            live: true
        }).on('change', fetchMessages );
    //



    /* 
    Méthodes
    */
        // Fonction pour ajouter un message dasn PouchBD
        const addMessage = ( message ) => {
            const dateNow = new Date();

            // Ajouter le message dans la BDD
            pouchDatabase.put({
                _id: dateNow,
                author: 'le sang',
                content: message,
                created_at: dateNow
            })
            .then( success => console.log(success) )
            .catch( err => console.error(err) );
        }

        
        
        // Fonction pour la validation du formulaire
        const startChat = () => {
            // Capter la soumission du formulaire
            form.addEventListener( 'submit', event => {
                // Bloquer le comportement naturel du formulaire
                event.preventDefault();
                
                // Vérifier la taille du message
                if( userMessage.value.length >= 2 ){
                    // Enregistrer le message dans la BDD
                    addMessage(userMessage.value);
                };
            })
        };
    //

    /* 
    Lancer l'interface
    */
        // BDD sync
        syncDatabases();

        // Chatbox start
        startChat();
    //

});