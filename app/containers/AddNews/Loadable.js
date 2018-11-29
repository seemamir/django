/**
 *
 * Asynchronously loads the component for AddNews
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
