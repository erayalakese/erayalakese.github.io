class Story {
    static instance = null;
    static data = [];

    static getInstance() {
        if (!Story.instance) {
            Story.instance = new Story();
        }
        return Story.instance;
    }

    insertRelation(node1, node2, node3) {
        Story.data.push({
            node1: node1,
            node2: node2,
            node3: node3
        });
    }

    getRelation(node1, node2) {
        const relation = Story.data.find(relation => 
            (relation.node1 === node1 && relation.node2 === node2) || 
            (relation.node1 === node2 && relation.node2 === node1)
        );
        return relation ? relation.node3 : null;
    }

    getRelations(node) {
        return Story.data.filter(relation => relation.node1 === node || relation.node2 === node);
    }
}

Story.getInstance().insertRelation("You", "Psikiyatri Polikliniği", [{data:"Terapist", icon:"fa-solid fa-user-doctor"}, {data:"You", icon:"fa-solid fa-person"}, {data:"Cam Kırıkları", icon:"fa-solid fa-glass-water-droplet"}]);
Story.getInstance().insertRelation("You", "Terapist", [{data:"NELER OLDU BURADA?", icon:"fa-solid fa-question"}, {data:"You", icon:"fa-solid fa-person"}]);
Story.getInstance().insertRelation("You", "Cam Kırıkları", [{data:"Cam Parçaları", icon:"fa-solid fa-glass-water"}, {data:"Kan İzleri", icon:"fa-solid fa-droplet"}, {data:"You", icon:"fa-solid fa-person"}]);
Story.getInstance().insertRelation("You", "NELER OLDU BURADA?", [{data:"Psikiyatrist William Gray", icon:"fa-solid fa-user-doctor"}, {data:"You", icon:"fa-solid fa-person"}, {data:"Terapist Ofisi", icon:"fa-solid fa-door-closed"}, {data:"Asistan", icon:"fa-solid fa-user-secret"}]);
Story.getInstance().insertRelation("You", "Terapist Ofisi", [{data:"Karıştırılmış Çekmece", icon:"fa-solid fa-box-open"}, {data:"You", icon:"fa-solid fa-person"}]);
Story.getInstance().insertRelation("You", "Psikiyatrist William Gray", [{data: "TERAPISTI SORGULA", icon:"fa-solid fa-user-doctor"}, {data:"You", icon:"fa-solid fa-person"}]);
Story.getInstance().insertRelation("You", "TERAPISTI SORGULA", [{data: "SOKAĞA ÇIK", icon:"fa-solid fa-city", clue: true}, {data:"You", icon:"fa-solid fa-person"}]);
Story.getInstance().insertRelation("You", "Asistan", [{data: "ASISTANI SORGULA", icon:"fa-solid fa-user-secret"}, {data:"You", icon:"fa-solid fa-person"}]);
