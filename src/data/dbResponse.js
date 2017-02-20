const dbResponse = [
    {
        id: '01',
        title: 'Canada Meeting',
        destination: 'Toronto',
        description: '',
        category: 'Business Trip',
        startDate: '02/01/2017',
        endDate: '02/09/2017',
        todos: [
            {
                id: '897',
                title: 'Todo 1',
                complete: true
            },{
                id: '387',
                title: 'Todo 2',
                complete: false
            }
        ],
        planningState: 'In Progress'
    },
    {
        id: '02',
        title: 'Trip 1',
        destination: 'Los Angeles',
        description: '',
        category: 'None',
        startDate: '02/01/2017',
        endDate: '02/11/2017',
        todos: [
            {
                id: '8977',
                title: 'Todo 3',
                complete: true
            },{
                id: '3887',
                title: 'Todo 4',
                complete: false
            }
        ],
        planningState: 'In Progress'
    }
];

export default dbResponse;
