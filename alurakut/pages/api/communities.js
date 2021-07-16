import { SiteClient } from 'datocms-client';

export default async function requestHandler(request, response) {

    if(request.method === 'POST') {
        const TOKEN = '3711a0e4d64044e13ebf4013031fab';
        const client = new SiteClient(TOKEN);
    
        // There should be a data valitation step 

        const myRecord = await client.items.create({
            itemType: '967049',
            ...request.body,
        })
    
        response.json({
            dados: 'Algum dado qualquer',
            myRecord: myRecord,
        })

        return;
    }

    response.status(404).json({
        message: 'Ainda nada no GET, mas no POST, sim.'
    })
}

