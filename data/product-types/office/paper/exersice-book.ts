
import { ag } from '../../../attribute-groups';

PType({
    name: 'Exersice book',
    key: 'exersicebook',
    categories: ['paper'],
    attributeRefs: [
        ...ag.common,
    ]
});