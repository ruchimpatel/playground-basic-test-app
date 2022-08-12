export interface Questionnaire {
    resourceType: string;
    id: string;
    url: string;
    status: string;
    subjectType: string[];
    date: string;
    item: Item[];
}

export interface Item {
    linkId: string;
    text: string;
    type: string;
    option?: Option[];
    value?: string;
}

export interface Option {
    valueCoding: ValueCoding;
}

export interface ValueCoding {
    system: string;
    code: string;
    display: string;
}

export interface QuestionnaireResponse {
    resourceType: string;
    id: string;
    identifier: Identifier[];
    basedOn: Reference[];
    partOf: Reference[];
    questionnaire: Question;
    status: string;
    subject: Reference;
    encounter: Reference;
    authored: Date;
    author: Reference;
    source: Source;
    item: ItemResponse[];
}

export interface Question {
    subjectType: string;
}
 export interface Source{
    answeredBy: string
 }

export interface Identifier{
    system: string;
    value: string;
}

export interface Reference{
    reference: string;
}

export interface ItemResponse{
    linkId: string;
    text: string;
    answer: Answer[];
}

export interface Answer{
    valueString?: string;
    valueBoolean?: boolean;
    valueDate?: string;
}


