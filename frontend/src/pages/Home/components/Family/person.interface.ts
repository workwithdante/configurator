interface Person {
    firstname: {
        value: string
        error: boolean
    }
    middlename: {
        value: string
        error: boolean
    }
    lastname: {
        value: string
        error: boolean
    }    
    coverage: {
        error: boolean
        bg_color: string
        label: string
    }
    age: {
        value: string
        error: boolean
    }
    dob: {
        value: string
        error: boolean
    }
    pob: {
        value: string
        error: boolean
    }
    gender: {
        value: string
        error: boolean
    }
    ssn: {
        value: string
        error: boolean
    }
    document: {
        value: string
        error: boolean
    }
    smoke: {
        value: string,
        color: string,
        error: boolean
    }
    jail: {
        value: string,
        error: boolean
    }
    pregnant: {
        value: string,
        error: boolean
    }
    phone1: {
        value: string
        error: boolean
    }
    phone2: {
        value: string
        error: boolean
    }
    email: {
        value: string
        error: boolean
    }
}

interface Address {
    address: {
        value: string
        error: boolean
    }
    optional: {
        value: string
        error: boolean
    }
    city: {
        value: string
        error: boolean
    }
    state: {
        value: string
        error: boolean
    }
    zipcode: {
        value: string
        error: boolean
    }
    county: {
        value: string
        error: boolean
    }
}

export interface DependentI extends Person {
    id: number
    relationship: {
        value: string
        error: boolean
    }
}

export interface Owner extends Person {
    statusSell: {
        value: string
        error: boolean
    }
    language: {
        value: string
        error: boolean
    }
    selldate: {
        value: string,
        error: boolean
    }
    address: Address;    
    aor: {
        value: string,
        error: boolean
    }
    broker: {        
        value: string,
        error: boolean
    }
}