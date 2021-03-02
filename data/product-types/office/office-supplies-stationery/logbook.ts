
import { ag } from '../../../attribute-groups';

PType({
    name: 'Logbook',
    key: 'logbook',
    categories: ['officeSupplies'],
    attributeRefs: [
        ...ag.common,
    ]
});