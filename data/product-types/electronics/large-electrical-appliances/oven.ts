

import { ag } from '../../../attribute-groups';

PType({
    name: 'Oven',
    key: 'oven',
    categories: ['largeElectricAppliances'],
    attributeRefs: [
        ...ag.common,
    ]
});