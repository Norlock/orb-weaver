export class OrbWeaverService {
    constructor() {
        this.baseUrl = 'http://localhost:5000'; 
        this.endPoints = {
            allOwNodes: '/api/ow-nodes'
        }
    }

    async fetchRequest() {
        console.log(this.baseUrl + this.endPoints.allOwNodes);
        const response = await fetch(this.baseUrl + this.endPoints.allOwNodes);
        const data = await response.json();
        return data;
    }

}
