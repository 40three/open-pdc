
import { ag } from '../../../attribute-groups';

PType({
    name: 'Ice cube machine',
    key: 'icecubemachine',
    categories: ['kitchenAppliances'],
    attributeRefs: [
        ...ag.common,
    ]
});