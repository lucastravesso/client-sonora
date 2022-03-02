export default function verifyAddress(address, value){

    if(address === null)
    {
        return 'Não informado';
    }

    if(address.complement === null)
    {
        return 'Não informado';
    }else{
        if(value === 'complement') return address.complement;
    }

    if(value === 'country') return address.country;
    if(value === 'state') return address.state;
    if(value === 'city') return address.city;
    if(value === 'district') return address.district;
    if(value === 'street') return address.street;
    if(value === 'number') return address.number;

    
}