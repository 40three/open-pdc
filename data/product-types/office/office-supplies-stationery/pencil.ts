
import { ag } from '../../../attribute-groups';

PType({
    name: 'Pencil',
    key: 'pencil',
    categories: ['stationery'],
    attributeRefs: [
        ...ag.common,
    ]
});