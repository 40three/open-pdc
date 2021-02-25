
import { ag } from '../../../attribute-groups';

PType({
    name: 'Radio',
    key: 'radio',
    categories: ['audioHifi', 'homeCinema'],
    attributeRefs: [
        ...ag.common,
    ]
});