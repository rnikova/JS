function solve(input) {
    let systems = new Map();

    for(let line of input) {
        let tokens = line.split(/\s*\|\s*/);
        let system = tokens[0];
        let component = tokens[1];
        let subcomponent = tokens[2];

        if(!systems.get(system)){
            systems.set(system, new Map());
        }
        if(!systems.get(system).get(component)){
            systems.get(system).set(component, [])
        }
        systems.get(system).get(component).push(subcomponent);
    }

    let systemsSorted = Array.from(systems.keys()).sort((a, b) => sortSystems(a, b));

    for(let system of systemsSorted) {
        console.log(system);
        let componentsSorted = Array.from(systems.get(system).keys()).sort((a, b) => sortComponents(system, a, b));

        for(let component of componentsSorted) {
            console.log(`|||${component}`);
            systems.get(system).get(component).forEach(sc => console.log(`||||||${sc}`))
        }
    }

    function sortSystems(a, b) {
        if(systems.get(a).size != systems.get(b).size) {
            return systems.get(b).size - systems.get(a).size;
        } else {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        }
    }

    function sortComponents(system, a, b) {
        return systems.get(system).get(b).length - systems.get(system).get(a).length;
    }
}