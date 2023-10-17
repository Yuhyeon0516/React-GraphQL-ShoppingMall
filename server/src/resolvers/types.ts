type Method = 'Query' | 'Mutation';

export type Resolver = {
    [k: string]: {
        [ket: string]: (parent: any, args: { [key: string]: any }, context: {}, info: any) => any;
    };
};
