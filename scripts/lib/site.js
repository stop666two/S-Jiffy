'use strict';
// Canonical site origin, used by the SEO generator (canonical links, sitemap,
// robots) and by anything else that needs absolute URLs.
//
// MUST be the real deployment origin — change it here and rerun
// `node scripts/gen-meta.js`, nothing else hardcodes the host.

var SITE_ORIGIN = 'https://s-jiffy.app';

module.exports = { SITE_ORIGIN: SITE_ORIGIN };
