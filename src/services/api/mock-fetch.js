/*
You should implement a mock fetch call for your backend communication. This call should
have the same interface as the real fetch and return a promise wrapped response object.
The response should return disqualify message (Lorum Ipsem is fine) if the purchase price
is more than 1/5th of the income or their estimated credit is below 600. Otherwise it 
should return a positive qualification flag. A `Bad Request` response should be returned 
for any auto purchase price above $1,000,000.
*/

export default function MockFetch(url, data){
    let init = { "status" : 500 , "statusText" : "something went wrong!" };
    let response = new Response({},init);
    switch(url.toLowerCase()){
        case 'autoloan':
            if(data['purchasePrice'] > 1000000){
                let init = { "status" : 400 , "statusText" : "Bad Request" };
                response = new Response({},init);
            }else if(data['purchasePrice'] > (data['yearlyIncome']/5)){
                let init = { "status" : 200 , "statusText" : "disqualified auto loan" };
                response = new Response(JSON.stringify({hasQualified: false, msg: 'Lorum Ipsem'}),init);
            }else{
                let init = { "status" : 200 , "statusText" : "qualified auto loan" };
                response = new Response(JSON.stringify({hasQualified: true, msg: 'qualified auto loan'}),init);
            }
        break;
        case 'newaccount':
            let init = { "status" : 200 , "statusText" : "account created" };
            response = new Response({},init);
    }
    return Promise.resolve(response);
}