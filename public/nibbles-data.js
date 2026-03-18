/* ── Nibbles Cloak Cabinet — data + app logic ── */

const CONTRACT = "0x5e52d41f0e40d7cdb204db0d09659846f7404547";

const TYPE_ORDER = ["All", "Bear", "Cock", "Gecko", "Ghost", "Gnome", "Raccoon", "Wolf", "Forest"];

const FEATURED_BY_TYPE = {
  Bear: 5244, Cock: 1118, Gecko: 2650, Ghost: 3280,
  Gnome: 8549, Raccoon: 2754, Wolf: 1225, Forest: 3342
};

const COUNTS = {
  Bear: 31, Cock: 33, Gecko: 33, Ghost: 32,
  Gnome: 33, Raccoon: 33, Wolf: 33, Forest: 36
};

/* ── Token IDs per type ── */
const TOKEN_IDS = {
  Bear:    [161,693,954,1209,1250,1300,1588,1691,2158,2322,2935,3669,4000,4339,5244,5362,5371,5568,5742,6319,6667,6834,7255,7537,8109,8238,8247,8455,8805,8814,8839],
  Cock:    [165,469,514,687,1118,1353,1441,2256,2658,3154,3242,3388,3507,4137,4292,5089,5379,5965,5998,6028,6471,6621,6986,7142,8369,8559,8670,8753,8789,8803,8816,8840,8846],
  Gecko:   [951,1006,1076,1641,1965,2423,2585,2650,2849,3155,3488,3744,3781,4055,4335,4508,4528,4670,5265,5598,5749,6317,6784,6837,7106,7184,7304,7486,7647,7688,8301,8404,8544],
  Ghost:   [326,652,663,711,848,1692,1910,2041,2058,2173,2704,2914,2918,3280,3496,3587,4075,4211,4735,4885,4892,5299,5735,5891,6909,7488,7579,7721,8640,8766,8782,8796],
  Gnome:   [450,550,637,922,1438,1512,1584,1708,2159,2908,2946,3132,3443,3516,3775,3970,4060,4148,4440,5075,5988,6672,6774,7681,7722,7954,8129,8459,8549,8687,8718,8834,8836],
  Raccoon: [368,744,1448,1513,1908,2093,2519,2578,2754,2952,3130,3219,3601,3764,4288,5984,6030,7298,7460,7880,7988,8082,8169,8324,8502,8555,8585,8590,8690,8822,8827,8841,8842],
  Wolf:    [249,272,553,896,1066,1225,1412,1424,1695,1771,1879,1962,2424,2506,3022,3029,3357,3428,3768,4255,4607,6176,6338,6341,6361,6508,6548,6603,6775,7996,8533,8623,8799],
  Forest:  [13,412,1113,1227,1825,1987,2034,2385,2494,2636,2854,3185,3342,3780,3968,4217,4273,4430,4625,5066,5456,5470,5580,5668,6174,6297,6766,6977,7351,8072,8146,8201,8204,8211,8409,8410]
};

/* ── Forest SVG placeholder builder ── */
function forestSvg(tokenId) {
  return "data:image/svg+xml," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#3a5a2c"/><stop offset="100%" stop-color="#1f3316"/>' +
    '</linearGradient></defs>' +
    '<rect width="400" height="400" fill="url(#g)"/>' +
    '<text x="200" y="180" text-anchor="middle" fill="#fff" font-family="Arial" font-size="22" font-weight="bold">Forest Cloak</text>' +
    '<text x="200" y="230" text-anchor="middle" fill="#d6ba78" font-family="Arial" font-size="40" font-weight="bold">#' + tokenId + '</text>' +
    '</svg>'
  );
}

const IMAGE_MAP = {
  161: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/25e2d4f6e084e35d73e59582d4eda9/4a25e2d4f6e084e35d73e59582d4eda9.png",
  165: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/8b35c75a1e32d6715e9072361a29a1/9c8b35c75a1e32d6715e9072361a29a1.png",
  249: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/f3ac6f50904ad982788a20f7daba0d/f4f3ac6f50904ad982788a20f7daba0d.png",
  272: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/0fe37cb923ad711f141d0d043ba391/300fe37cb923ad711f141d0d043ba391.png",
  326: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/623b06d82f85a8412eadfc175c6025/b5623b06d82f85a8412eadfc175c6025.png",
  368: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/3cad3ee09502a21c4e230e2e1e6f48/e23cad3ee09502a21c4e230e2e1e6f48.png",
  450: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/077fc769eaf9bc5efccb68291dcea4/57077fc769eaf9bc5efccb68291dcea4.png",
  469: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/d6549452f5d55344453d1accb11a64/d5d6549452f5d55344453d1accb11a64.png",
  514: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/40b84a0c1edca169415e4c955d12bf/3240b84a0c1edca169415e4c955d12bf.png",
  550: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/c5935b74a5fee8da3586713033f4a7/4bc5935b74a5fee8da3586713033f4a7.png",
  553: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/287b3191c8365805348d8901b3bf9d/16287b3191c8365805348d8901b3bf9d.png",
  637: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/a02c7a3f8734f6826b870a64146ef0/f2a02c7a3f8734f6826b870a64146ef0.png",
  652: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/6a74a60f745221ff7304bdf90f84e2/916a74a60f745221ff7304bdf90f84e2.png",
  663: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/0b107004f52220f5e15cf971e2c7e7/480b107004f52220f5e15cf971e2c7e7.png",
  687: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/2ab789a39d004626c0a17fce01c977/632ab789a39d004626c0a17fce01c977.png",
  693: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/5cc498c2e7aeafa7efdd5b7238985d/845cc498c2e7aeafa7efdd5b7238985d.png",
  711: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/ce24f24c4efc9ac3f691fde31eb14d/15ce24f24c4efc9ac3f691fde31eb14d.png",
  744: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/e31a87a407b0e259a76d43567faa2f/fce31a87a407b0e259a76d43567faa2f.png",
  848: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/0c57ced6838c0d236f63a2a3e80d3c/1e0c57ced6838c0d236f63a2a3e80d3c.png",
  896: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/3ad7928051ec9d3edd134dc2f11857/c73ad7928051ec9d3edd134dc2f11857.png",
  922: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/f6467c2f734d7de9e7a7883d815b6f/cbf6467c2f734d7de9e7a7883d815b6f.png",
  951: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/6b9c26f15ed3d7782653b6a975e50c/016b9c26f15ed3d7782653b6a975e50c.png",
  954: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/d58d9cb2fde9e5af98341ce87e3bbb/c1d58d9cb2fde9e5af98341ce87e3bbb.png",
  1006: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/5102cab7c7dcac0f1595d1ff2190a3/fb5102cab7c7dcac0f1595d1ff2190a3.png",
  1066: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/5d94d8869db16457d53b7d1ba52f15/685d94d8869db16457d53b7d1ba52f15.png",
  1076: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/9ff676cc6739e1efdd5ba8ef39ead7/ac9ff676cc6739e1efdd5ba8ef39ead7.png",
  1118: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/a889f3bacb0f4ff17dc4fd7ce4ea44/cea889f3bacb0f4ff17dc4fd7ce4ea44.png",
  1209: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/bd7588de3af5549ef1ed327b31ff39/aabd7588de3af5549ef1ed327b31ff39.png",
  1225: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/55f9228fb7ffd9cfebc66022a69940/0655f9228fb7ffd9cfebc66022a69940.png",
  1250: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/092b5eee6b048b042a5632748d53a7/8f092b5eee6b048b042a5632748d53a7.png",
  1300: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/ed0d28154095e06eec49b4652204f7/d4ed0d28154095e06eec49b4652204f7.png",
  1353: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/4124acb0c66e7abceb30308e274ecc/9c4124acb0c66e7abceb30308e274ecc.png",
  1412: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/3b9e98ceaf774e4ed91aba1a6ce9ec/063b9e98ceaf774e4ed91aba1a6ce9ec.png",
  1424: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/3dca4dc7838ad6081e2f673c8f4d3e/f53dca4dc7838ad6081e2f673c8f4d3e.png",
  1438: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/22929a4f34ef24043f3c1670da9fe0/b622929a4f34ef24043f3c1670da9fe0.png",
  1441: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/e9773e5f9e53f23a9486d6f3c65dcb/ace9773e5f9e53f23a9486d6f3c65dcb.png",
  1448: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/1bb41694a1bc611a5bec3cbac9c7db/a11bb41694a1bc611a5bec3cbac9c7db.png",
  1512: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/149fca73f9876e68ca0fe1a4355d81/b7149fca73f9876e68ca0fe1a4355d81.png",
  1513: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/2d1f4dc9eb9fde3768121eec2ab1d0/1e2d1f4dc9eb9fde3768121eec2ab1d0.png",
  1584: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/ac561613cceeb89b71a05396878061/09ac561613cceeb89b71a05396878061.png",
  1588: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/98ac423cb78070baa666a0893e1cea/7498ac423cb78070baa666a0893e1cea.png",
  1641: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/6aec614818159580409ff1d464e616/786aec614818159580409ff1d464e616.png",
  1691: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/2cfbe1e6595fb745b06080a236377a/442cfbe1e6595fb745b06080a236377a.png",
  1692: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/7d6b9d2427b4dff052e1ed82d5d142/287d6b9d2427b4dff052e1ed82d5d142.png",
  1695: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/16ac7060046b7fe4f49b46f4c8a463/cc16ac7060046b7fe4f49b46f4c8a463.png",
  1708: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/505b1c61d89ef0a0dd4cb4733af95d/d6505b1c61d89ef0a0dd4cb4733af95d.png",
  1771: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/1bb4d518b2c3b652304bb151b3fc9b/5e1bb4d518b2c3b652304bb151b3fc9b.png",
  1879: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/454bbf227f2c2b0ea54a10181cf58a/1c454bbf227f2c2b0ea54a10181cf58a.png",
  1908: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/4440c706f6a3ad9a61e225c1dc38b1/eb4440c706f6a3ad9a61e225c1dc38b1.png",
  1910: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/16e3f8cbbfdbc522031e7070553b0d/1116e3f8cbbfdbc522031e7070553b0d.png",
  1962: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/7a7cad4d5466e68fa93114a005ff7d/fa7a7cad4d5466e68fa93114a005ff7d.png",
  1965: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/d224e7420ad4cf02cd7f0d7d1cb969/4ad224e7420ad4cf02cd7f0d7d1cb969.png",
  2041: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/5fce4837175c47e623fb3aa694f779/b95fce4837175c47e623fb3aa694f779.png",
  2058: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/0710b6a2f5aba3b390dd4804860ace/550710b6a2f5aba3b390dd4804860ace.png",
  2093: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/5340af863f1a373a9bd9c1f4bb0cc2/245340af863f1a373a9bd9c1f4bb0cc2.png",
  2158: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/1768907e5cfa963bd5032266f8bcb0/861768907e5cfa963bd5032266f8bcb0.png",
  2159: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/0fd41bd1ebd2daa83be975f449cb6c/b00fd41bd1ebd2daa83be975f449cb6c.png",
  2173: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/e7ae4c351eb08e8766b69699d421fa/c6e7ae4c351eb08e8766b69699d421fa.png",
  2256: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/7ad6d78a779dc54a69bb05786ddd37/e27ad6d78a779dc54a69bb05786ddd37.png",
  2322: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/b4d2e337979cfb8d73d925fe2071af/51b4d2e337979cfb8d73d925fe2071af.png",
  2423: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/5b964b3820d37e4c49eb404f57f2f2/525b964b3820d37e4c49eb404f57f2f2.png",
  2424: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/c2189cf61a7ecf0b410c11f1e2cdbe/52c2189cf61a7ecf0b410c11f1e2cdbe.png",
  2506: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/d5f3d177ea7cf473bff68054371a9b/7cd5f3d177ea7cf473bff68054371a9b.png",
  2519: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/302772b67448a679c7d8bf22a42ad0/13302772b67448a679c7d8bf22a42ad0.png",
  2578: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/1751201a9c3e3f92549abcc8a73eaf/f31751201a9c3e3f92549abcc8a73eaf.png",
  2585: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/a5cfc43310e28524a436fc4bd8a2cd/32a5cfc43310e28524a436fc4bd8a2cd.png",
  2650: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/bdcf3b2ead90fad6f7e258a426020a/6dbdcf3b2ead90fad6f7e258a426020a.png",
  2658: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/733d104f7cc922515f708fb78f73b9/c6733d104f7cc922515f708fb78f73b9.png",
  2704: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/74829ea601987a2e88bab64ab0f37b/5774829ea601987a2e88bab64ab0f37b.png",
  2754: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/981ccb2eb747643fc8df5e0e24b715/7d981ccb2eb747643fc8df5e0e24b715.png",
  2849: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/fd13971beb83f8d7fae6f20f5c02bb/0afd13971beb83f8d7fae6f20f5c02bb.png",
  2908: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/920fb451ae8b1c00eff7e80c3e57a9/d8920fb451ae8b1c00eff7e80c3e57a9.png",
  2914: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/80592e4e421de0c81d439a6d35559b/7780592e4e421de0c81d439a6d35559b.png",
  2918: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/6538583c1e9d7659af2497d112b8be/b66538583c1e9d7659af2497d112b8be.png",
  2935: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/d4f3fdf4b2ba470a221126a2b17020/2dd4f3fdf4b2ba470a221126a2b17020.png",
  2946: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/a777b2919284d80e83f28e5a7ebb0a/5aa777b2919284d80e83f28e5a7ebb0a.png",
  2952: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/30df887c42691d85dcc2e8847b394e/e330df887c42691d85dcc2e8847b394e.png",
  3022: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/a73e62e431ac80ab6f004d6e461449/6ea73e62e431ac80ab6f004d6e461449.png",
  3029: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/73d7404d5726c8f0ebfa3ea7f33970/e673d7404d5726c8f0ebfa3ea7f33970.png",
  3130: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/4d873112e28edd23551bc5f9b12d17/fb4d873112e28edd23551bc5f9b12d17.png",
  3132: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/05690f67b2c920fa83ed1cb9ef6a43/5505690f67b2c920fa83ed1cb9ef6a43.png",
  3154: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/e9a37928e2a65b61210533b92daa4f/d5e9a37928e2a65b61210533b92daa4f.png",
  3155: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/5f739b5b8410b2d52f83bc631838b2/f85f739b5b8410b2d52f83bc631838b2.png",
  3219: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/17a613fb2df281451b392743709399/1617a613fb2df281451b392743709399.png",
  3242: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/aa532001870eaba7baceb2eabd036b/e2aa532001870eaba7baceb2eabd036b.png",
  3280: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/3d98a4c5d3f43efdf5232f1e3cb2d8/cd3d98a4c5d3f43efdf5232f1e3cb2d8.png",
  3357: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/ed50692733ce5df45677ddd127a915/e9ed50692733ce5df45677ddd127a915.png",
  3388: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/9a460f618c75d0acf5a906c0d0afe9/c99a460f618c75d0acf5a906c0d0afe9.png",
  3428: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/42c2bcc3c49db7a3c424ab3a895cd7/a942c2bcc3c49db7a3c424ab3a895cd7.png",
  3443: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/b0bce37a6d95ea14424aeec13ee3d1/ddb0bce37a6d95ea14424aeec13ee3d1.png",
  3488: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/0f9aea86c8dc4041eeabb7ff58a535/ec0f9aea86c8dc4041eeabb7ff58a535.png",
  3496: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/f8ad5157e875d1216aaf2daf0795e5/a3f8ad5157e875d1216aaf2daf0795e5.png",
  3507: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/7a7ae79d400870d3addc0b1b98f966/427a7ae79d400870d3addc0b1b98f966.png",
  3516: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/df06962cb499a34645b4e6dd441008/99df06962cb499a34645b4e6dd441008.png",
  3587: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/a43440ad14b78a35895c5a75071ec6/c8a43440ad14b78a35895c5a75071ec6.png",
  3601: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/6a65192dab2fc7d23ece476731cdec/5b6a65192dab2fc7d23ece476731cdec.png",
  3669: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/ddfaee65d4abefa5a9008d9ac763ad/b1ddfaee65d4abefa5a9008d9ac763ad.png",
  3744: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/59393504dc2f001f198f6d1e561755/ec59393504dc2f001f198f6d1e561755.png",
  3764: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/7b79b1f3df4e6bf5031ccc9fcedd5d/977b79b1f3df4e6bf5031ccc9fcedd5d.png",
  3768: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/45b691fb10470b49460d4713f685f0/f145b691fb10470b49460d4713f685f0.png",
  3775: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/5c92a93f3df41efad29185c259dbaa/6a5c92a93f3df41efad29185c259dbaa.png",
  3781: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/4ca5b842b5cb0272c17a053c69dc38/704ca5b842b5cb0272c17a053c69dc38.png",
  3970: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/f53daab5867555fedc5e058b9d461b/8df53daab5867555fedc5e058b9d461b.png",
  4000: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/22886b8f7f1c73e2e57fb4ed7c6f04/9022886b8f7f1c73e2e57fb4ed7c6f04.png",
  4055: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/54c086197340c171ee451039cc5966/df54c086197340c171ee451039cc5966.png",
  4060: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/58804500538aa2e659ea6d8aa39673/7458804500538aa2e659ea6d8aa39673.png",
  4075: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/abef497fc5d9aa1a9ebeadf3c4f1ad/adabef497fc5d9aa1a9ebeadf3c4f1ad.png",
  4137: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/aed54fb7a17d1296acbe5c3e06ca0b/35aed54fb7a17d1296acbe5c3e06ca0b.png",
  4148: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/4ed352b3739ae02dbe42bc2a9a8774/da4ed352b3739ae02dbe42bc2a9a8774.png",
  4211: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/c15b8f3c13b22f20da65749ac26974/c8c15b8f3c13b22f20da65749ac26974.png",
  4255: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/34f9006351d093e1519eb7ec4da38f/cb34f9006351d093e1519eb7ec4da38f.png",
  4288: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/2c0cae7f40705587efc1eab186773b/6d2c0cae7f40705587efc1eab186773b.png",
  4292: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/f994934a0473b0031eabb5a16f1058/9ff994934a0473b0031eabb5a16f1058.png",
  4335: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/7fdcd8852def420fc67aaa569f737d/1f7fdcd8852def420fc67aaa569f737d.png",
  4339: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/0ccae65f27af6bc061016b7a7f6255/470ccae65f27af6bc061016b7a7f6255.png",
  4440: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/763e149adea7f6eebecca6b8b6ff89/3c763e149adea7f6eebecca6b8b6ff89.png",
  4508: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/eeb130a5cc3ddb913c7af728a3216c/d9eeb130a5cc3ddb913c7af728a3216c.png",
  4528: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/0c4b671b1702997096913dfcacf3bf/810c4b671b1702997096913dfcacf3bf.png",
  4607: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/68aa288b18140bef6c1bb57c1c75ff/c168aa288b18140bef6c1bb57c1c75ff.png",
  4670: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/31baf949d517dd52e37c3a01634c52/0a31baf949d517dd52e37c3a01634c52.png",
  4735: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/12cce4719b8cd58a58f67692f38c47/c612cce4719b8cd58a58f67692f38c47.png",
  4885: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/6f4ce667d5c4543183546a594ea325/d66f4ce667d5c4543183546a594ea325.png",
  4892: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/f1f7d19eb2d095bd1c9148e3c846d3/52f1f7d19eb2d095bd1c9148e3c846d3.png",
  5075: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/728888a3ac3bb936a4f039e3f58b33/16728888a3ac3bb936a4f039e3f58b33.png",
  5089: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/f3fd5c912f0add6f69780b5a640b87/a0f3fd5c912f0add6f69780b5a640b87.png",
  5244: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/3446ef9048bfb64689b089778ee394/ab3446ef9048bfb64689b089778ee394.png",
  5265: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/1c9cb56d2a766e87133daeb96756ec/841c9cb56d2a766e87133daeb96756ec.png",
  5299: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/43d1ac7b18a4527485d85b59686b8a/9c43d1ac7b18a4527485d85b59686b8a.png",
  5362: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/1f1e2124959beed1b78a268fe16dde/961f1e2124959beed1b78a268fe16dde.png",
  5371: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/c4b2d79e3c2aaaaf583767daae976b/9ac4b2d79e3c2aaaaf583767daae976b.png",
  5379: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/1604a92b39ae604d291ec2daf73cbe/5a1604a92b39ae604d291ec2daf73cbe.png",
  5568: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/1c3697355b82854b9cf0191d8ff0f6/a21c3697355b82854b9cf0191d8ff0f6.png",
  5598: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/e4fafc5429ce6eae5682e0d205da81/9ce4fafc5429ce6eae5682e0d205da81.png",
  5735: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/a9703c581cb4e632d0bc980fa72198/cfa9703c581cb4e632d0bc980fa72198.png",
  5742: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/fd57c4b4b40a1fcc26f3d40515197b/e1fd57c4b4b40a1fcc26f3d40515197b.png",
  5749: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/baf71a6b15aa4e136a95f22206bc7a/e5baf71a6b15aa4e136a95f22206bc7a.png",
  5891: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/a00a3c7c37308ec435ccc993a2d662/19a00a3c7c37308ec435ccc993a2d662.png",
  5965: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/c099bc08792f2bc47ad77c195a1026/abc099bc08792f2bc47ad77c195a1026.png",
  5984: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/3affde20830760e02d6754efdee93f/ad3affde20830760e02d6754efdee93f.png",
  5988: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/b79527efc8ddf798ec11f10305dbff/acb79527efc8ddf798ec11f10305dbff.png",
  5998: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/17e52ed4011ddc2ec37ae85c44ac62/9817e52ed4011ddc2ec37ae85c44ac62.png",
  6028: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/d251920e30b08eed34cf8b66cb0814/c6d251920e30b08eed34cf8b66cb0814.png",
  6030: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/5b913f666c277b53905d6b3b2faec5/cd5b913f666c277b53905d6b3b2faec5.png",
  6176: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/1a3c4a1556f92b382027f47d814d8d/8a1a3c4a1556f92b382027f47d814d8d.png",
  6317: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/0794f3ce1355ad233001665e75ff98/fa0794f3ce1355ad233001665e75ff98.png",
  6319: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/2a6fa32afd734837b6568fc4836425/1f2a6fa32afd734837b6568fc4836425.png",
  6338: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/e747be57874ecd46b58a25d081fde1/4be747be57874ecd46b58a25d081fde1.png",
  6341: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/4233ccf629e114a284f75656f51abb/724233ccf629e114a284f75656f51abb.png",
  6361: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/ca8496ed967b2656afb98c5e513b66/9dca8496ed967b2656afb98c5e513b66.png",
  6471: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/091690d55a3d64b0a4390291bd3067/74091690d55a3d64b0a4390291bd3067.png",
  6508: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/637195e1953412d75cf9ab399bfdc4/3f637195e1953412d75cf9ab399bfdc4.png",
  6548: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/4183419c203ea38ad00cf0cf18b2ba/544183419c203ea38ad00cf0cf18b2ba.png",
  6603: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/57266756bceb1224980602c27aa1a9/2e57266756bceb1224980602c27aa1a9.png",
  6621: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/3dd2689b32ff85a41c89b65b336ae0/873dd2689b32ff85a41c89b65b336ae0.png",
  6667: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/818f5e25176826009d944c28ff2fe7/35818f5e25176826009d944c28ff2fe7.png",
  6672: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/b25b6cb8f9684889503741c800db73/64b25b6cb8f9684889503741c800db73.png",
  6774: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/e0936b3bf9f742ad26f3c3ab0f3853/b1e0936b3bf9f742ad26f3c3ab0f3853.png",
  6775: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/184d251298c635dc9dc34a26ee6a8d/a5184d251298c635dc9dc34a26ee6a8d.png",
  6784: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/9cf6b39a7e8891e9d544eff7b0de28/ae9cf6b39a7e8891e9d544eff7b0de28.png",
  6834: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/1b706f4f3280202e40d1eef1daad68/a21b706f4f3280202e40d1eef1daad68.png",
  6837: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/73b70c05cb60fa16eec371ffe6504f/c373b70c05cb60fa16eec371ffe6504f.png",
  6909: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/93b67129e5f49deb44bef78b826772/fd93b67129e5f49deb44bef78b826772.png",
  6986: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/d6aeaacef4951ceda210528c14afb6/06d6aeaacef4951ceda210528c14afb6.png",
  7106: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/8cc53d7139662e5af3afbf1791df71/638cc53d7139662e5af3afbf1791df71.png",
  7142: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/c70beddd7a24deff555e350d5090b3/0dc70beddd7a24deff555e350d5090b3.png",
  7184: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/1f9a9bc018aafa7307eb69ab8ccdb3/3b1f9a9bc018aafa7307eb69ab8ccdb3.png",
  7255: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/ed546065d0954c834f3f48ed9e15dd/92ed546065d0954c834f3f48ed9e15dd.png",
  7298: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/ee618b91b6fe4b88e987c31cee0054/efee618b91b6fe4b88e987c31cee0054.png",
  7304: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/8daf8f2a6ff4017f926e3575e16a6c/d78daf8f2a6ff4017f926e3575e16a6c.png",
  7460: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/3c254a34a4538d41fedef36f45f939/b43c254a34a4538d41fedef36f45f939.png",
  7486: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/6639f3a20be871b5f246db01085bab/7e6639f3a20be871b5f246db01085bab.png",
  7488: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/6300cac08b872817d8cae8d297de21/ba6300cac08b872817d8cae8d297de21.png",
  7537: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/0862036e1812b0a7f60f67b4b64823/5a0862036e1812b0a7f60f67b4b64823.png",
  7579: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/497608ada56b2d78fb6794255e94b8/89497608ada56b2d78fb6794255e94b8.png",
  7647: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/5416005df91d2d4fd74739c5be863e/185416005df91d2d4fd74739c5be863e.png",
  7681: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/92ce232fa930c7ab17e5c1202d19b9/c992ce232fa930c7ab17e5c1202d19b9.png",
  7688: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/0552a5fefbc9e7bd87093ba3e69901/6f0552a5fefbc9e7bd87093ba3e69901.png",
  7721: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/eecb57301b71c5797ac3400684062b/92eecb57301b71c5797ac3400684062b.png",
  7722: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/98f055c2ef38147b0bbf012136ca99/c898f055c2ef38147b0bbf012136ca99.png",
  7880: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/eab19e10e0904b985fd4f186ef579a/6eeab19e10e0904b985fd4f186ef579a.png",
  7954: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/c5fa1e227b555e4cbb6d5c3b366dce/3dc5fa1e227b555e4cbb6d5c3b366dce.png",
  7988: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/1ca67f713ca9c4e0e6299e9abb2111/d41ca67f713ca9c4e0e6299e9abb2111.png",
  7996: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/1dd8a06541fc0ee40444cd79ac0071/521dd8a06541fc0ee40444cd79ac0071.png",
  8082: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/db65ced7f1d86d4c4fb0136dce19ba/aedb65ced7f1d86d4c4fb0136dce19ba.png",
  8109: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/9b88f058d397b9121912cfb67e7858/459b88f058d397b9121912cfb67e7858.png",
  8129: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/5f51c8e53a0bf7869ee3481dbac008/d75f51c8e53a0bf7869ee3481dbac008.png",
  8169: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/01f56d35c5f8fbd2605cc58f1198f7/4101f56d35c5f8fbd2605cc58f1198f7.png",
  8238: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/ca7a1280f21e4e29a524303b03974d/52ca7a1280f21e4e29a524303b03974d.png",
  8247: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/32f3f9b2c27f64d4abebffc3a32778/9132f3f9b2c27f64d4abebffc3a32778.png",
  8301: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/959213bcdc5b1fb9b3421d8cbdaedb/47959213bcdc5b1fb9b3421d8cbdaedb.png",
  8324: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/aeef81fb9dcb483b0b69a0729b52bb/47aeef81fb9dcb483b0b69a0729b52bb.png",
  8369: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/d89224d4c3e676bfc5ad322b3e634a/95d89224d4c3e676bfc5ad322b3e634a.png",
  8404: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/2b0b415d2e0cc03db5e85fdcfe225e/f62b0b415d2e0cc03db5e85fdcfe225e.png",
  8455: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/53f0bb44ddea279b53cd80d4e1d3bc/5b53f0bb44ddea279b53cd80d4e1d3bc.png",
  8459: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/090cbc6e7d115a52b71c148b6ec5bf/af090cbc6e7d115a52b71c148b6ec5bf.png",
  8502: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/13381d21087c4bbab9fe9e0f815a7f/2013381d21087c4bbab9fe9e0f815a7f.png",
  8533: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/8e7751f4b8e9fbfc3b7ff436e82ee5/ed8e7751f4b8e9fbfc3b7ff436e82ee5.png",
  8544: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/e7484af33af4e16fb7da39c3f90791/51e7484af33af4e16fb7da39c3f90791.png",
  8549: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/e5f0ffef5510af9b824a0e43537196/3de5f0ffef5510af9b824a0e43537196.png",
  8555: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/ce208b1e8bb0fe2dd6ee05cd54f4e8/face208b1e8bb0fe2dd6ee05cd54f4e8.png",
  8559: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/f94bf6bd9310116ab2afb164d2b94a/6ff94bf6bd9310116ab2afb164d2b94a.png",
  8585: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/97a0478de9137d0b3294821ac8c8aa/b997a0478de9137d0b3294821ac8c8aa.png",
  8590: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/41c81224ede3d054d5d846170df59e/bc41c81224ede3d054d5d846170df59e.png",
  8623: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/d90004ff22c116f2b52d5448e54bc2/c8d90004ff22c116f2b52d5448e54bc2.png",
  8640: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/12f0402c6bea2ecdd8c0a7e102976f/b212f0402c6bea2ecdd8c0a7e102976f.png",
  8670: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/739200f5f7a060ed48cf4e46d7e34b/3d739200f5f7a060ed48cf4e46d7e34b.png",
  8687: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/a37aecd6f57baf58e55bdda0c46393/0ba37aecd6f57baf58e55bdda0c46393.png",
  8690: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/2d3b30a1847188acbe63dbf6947f3f/1a2d3b30a1847188acbe63dbf6947f3f.png",
  8718: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/d7a63a71331014cba0e0eee0bf3fd9/a6d7a63a71331014cba0e0eee0bf3fd9.png",
  8753: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/78ec4302750c3325bb61ce3b0ed6dd/1b78ec4302750c3325bb61ce3b0ed6dd.png",
  8766: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/ca7c0fbf86501d4e1295a1cd00d366/2cca7c0fbf86501d4e1295a1cd00d366.png",
  8782: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/4c435c4a11437add41aa0c73c735c8/c44c435c4a11437add41aa0c73c735c8.png",
  8789: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/561ef881f1889a42ec3a59da64542f/3b561ef881f1889a42ec3a59da64542f.png",
  8796: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/c4fbc9d1383bca453934ffbe3524db/38c4fbc9d1383bca453934ffbe3524db.png",
  8799: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/0f9f684b5d80620d9f317f31c72425/590f9f684b5d80620d9f317f31c72425.png",
  8803: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/50b78088188c44b6b29a6eb3e8fa81/f150b78088188c44b6b29a6eb3e8fa81.png",
  8805: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/3732ae3db5c11a33e6589cd9b57b53/9e3732ae3db5c11a33e6589cd9b57b53.png",
  8814: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/fffe66f79e7b450409cac97816d3a6/05fffe66f79e7b450409cac97816d3a6.png",
  8816: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/2f60e1c7e90a10b28f3c4e7cd3cd35/df2f60e1c7e90a10b28f3c4e7cd3cd35.png",
  8822: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/ed53fbf24e24a12798230f9805c842/aded53fbf24e24a12798230f9805c842.png",
  8827: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/7ea19ccb4674543659ebbd56619e10/8c7ea19ccb4674543659ebbd56619e10.png",
  8834: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/a37add8546ca473013a62867a3b557/f5a37add8546ca473013a62867a3b557.png",
  8836: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/e219c54b5eb4f9cfd261a2e1ab626c/9ce219c54b5eb4f9cfd261a2e1ab626c.png",
  8839: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/18c24c0de077bea81889ce0be54d05/1918c24c0de077bea81889ce0be54d05.png",
  8840: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/f8cba647d4fcf24ac40afbde143b4d/cef8cba647d4fcf24ac40afbde143b4d.png",
  8841: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/8727ed5b393750cd09f6dae932686c/5d8727ed5b393750cd09f6dae932686c.png",
  8842: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/24472424f965e9778fe5defb2c6dc6/1a24472424f965e9778fe5defb2c6dc6.png",
  8846: "https://i2c.seadn.io/ethereum/0x5e52d41f0e40d7cdb204db0d09659846f7404547/f44d148514267d853f0c1795531f4c/0cf44d148514267d853f0c1795531f4c.png",
};

/* ── Build ALL_ITEMS from token lists ── */
const ALL_ITEMS = [];
for (const type of ["Bear","Cock","Gecko","Ghost","Gnome","Raccoon","Wolf","Forest"]) {
  for (const id of TOKEN_IDS[type]) {
    const isForest = type === "Forest";
    ALL_ITEMS.push({
      name: "Nibble #" + id,
      type: type,
      tokenId: id,
      openseaUrl: "https://opensea.io/item/ethereum/" + CONTRACT + "/" + id,
      imageUrl: isForest
        ? forestSvg(id)
        : (IMAGE_MAP[id] || "https://opensea.io/static/images/placeholder.png"),
      typeLabel: isForest ? "Forest Cloak" : type
    });
  }
}

/* ────────────────────────────────────────────
   App logic
   ──────────────────────────────────────────── */

(function () {
  "use strict";

  /* ── Cached DOM refs ── */
  const $ = (sel) => document.querySelector(sel);
  const tabsEl        = $("#tabs");
  const gridEl         = $("#grid");
  const emptyEl        = $("#emptyState");
  const featuredArt    = $("#featuredArt");
  const featuredTitle  = $("#featuredTitle");
  const featuredLabel  = $("#featuredLabel");
  const featuredType   = $("#featuredType");
  const featuredToken  = $("#featuredToken");
  const featuredDesc   = $("#featuredDesc");
  const statTotal      = $("#stat-total");
  const statShowing    = $("#stat-showing");
  const statTab        = $("#stat-tab");
  const statFeatured   = $("#stat-featured");

  const itemOverlay    = $("#itemOverlay");
  const helpOverlay    = $("#helpOverlay");
  const modalArt       = $("#modalArt");
  const modalName      = $("#modalName");
  const modalTypeLabel = $("#modalTypeLabel");
  const modalType      = $("#modalType");
  const modalToken     = $("#modalToken");
  const modalText      = $("#modalText");
  const modalLink      = $("#modalLink");
  const modalFootnote  = $("#modalFootnote");

  let currentTab = "All";

  /* ── Helpers ── */
  function itemsForTab(tab) {
    return tab === "All" ? ALL_ITEMS : ALL_ITEMS.filter(function (i) { return i.type === tab; });
  }

  function findItem(tokenId) {
    return ALL_ITEMS.find(function (i) { return i.tokenId === tokenId; });
  }

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /* ── Tabs ── */
  function buildTabs() {
    tabsEl.innerHTML = "";
    TYPE_ORDER.forEach(function (t) {
      var btn = document.createElement("button");
      btn.className = "folder-tab" + (t === currentTab ? " active" : "");
      var countVal = t === "All" ? ALL_ITEMS.length : (COUNTS[t] || 0);
      btn.innerHTML = t + ' <span class="count">' + countVal + "</span>";
      btn.addEventListener("click", function () {
        currentTab = t;
        buildTabs();
        renderAll();
      });
      tabsEl.appendChild(btn);
    });
  }

  /* ── Featured ── */
  function renderFeatured() {
    var item = null;
    if (currentTab === "All") {
      // Show a random featured
      var types = Object.keys(FEATURED_BY_TYPE);
      var rtype = randomFrom(types);
      item = findItem(FEATURED_BY_TYPE[rtype]);
    } else {
      var fid = FEATURED_BY_TYPE[currentTab];
      if (fid) item = findItem(fid);
    }
    if (!item) {
      featuredArt.innerHTML = "";
      featuredTitle.textContent = "—";
      featuredLabel.textContent = "Featured Cloak";
      featuredType.textContent = "—";
      featuredToken.textContent = "—";
      statFeatured.textContent = "—";
      return;
    }
    featuredArt.innerHTML = '<img src="' + item.imageUrl + '" alt="' + item.name + '" loading="lazy" />';
    featuredTitle.textContent = item.name;
    featuredLabel.textContent = "Featured " + item.typeLabel + " Cloak";
    featuredType.textContent = item.typeLabel;
    featuredToken.textContent = item.tokenId;
    statFeatured.textContent = item.name;
    featuredDesc.textContent = "This " + item.typeLabel + " cloak is the featured item for the " + item.typeLabel + " tab. Click any card below to see more details, or use the randomizers to discover cloaks.";

    /* wire featured popup button */
    var vfb = $("#viewFeaturedBtn");
    vfb.onclick = function () { openItemModal(item); };
  }

  /* ── Grid ── */
  function renderGrid() {
    var items = itemsForTab(currentTab);
    gridEl.innerHTML = "";
    if (items.length === 0) {
      gridEl.style.display = "none";
      emptyEl.style.display = "";
      return;
    }
    gridEl.style.display = "";
    emptyEl.style.display = "none";

    items.forEach(function (item) {
      var btn = document.createElement("button");
      btn.className = "card";
      btn.innerHTML =
        '<div class="thumb"><img src="' + item.imageUrl + '" alt="' + item.name + '" loading="lazy" /></div>' +
        '<p class="card-title">' + item.name + "</p>" +
        '<div class="card-row"><span class="tiny-type">' + item.typeLabel + "</span><span>#" + item.tokenId + "</span></div>";
      btn.addEventListener("click", function () { openItemModal(item); });
      gridEl.appendChild(btn);
    });

    statShowing.textContent = items.length;
    statTab.textContent = currentTab;
  }

  function renderAll() {
    renderFeatured();
    renderGrid();
  }

  /* ── Item modal ── */
  function openItemModal(item) {
    modalArt.innerHTML = '<img src="' + item.imageUrl + '" alt="' + item.name + '" loading="lazy" />';
    modalName.textContent = item.name;
    modalTypeLabel.textContent = item.typeLabel + " Cloak";
    modalType.textContent = item.typeLabel;
    modalToken.textContent = item.tokenId;
    modalText.textContent = "This is " + item.name + ", a " + item.typeLabel + " cloak from the Nibbles collection.";
    modalLink.href = item.openseaUrl;
    modalFootnote.textContent = "Contract: " + CONTRACT + " · Token " + item.tokenId;
    itemOverlay.classList.add("show");
    itemOverlay.setAttribute("aria-hidden", "false");
  }

  function closeItemModal() {
    itemOverlay.classList.remove("show");
    itemOverlay.setAttribute("aria-hidden", "true");
  }

  /* ── Help modal ── */
  function openHelp() {
    helpOverlay.classList.add("show");
    helpOverlay.setAttribute("aria-hidden", "false");
  }
  function closeHelp() {
    helpOverlay.classList.remove("show");
    helpOverlay.setAttribute("aria-hidden", "true");
  }

  /* ── Randomizer ── */
  function randomize(pool) {
    var item = randomFrom(pool);
    if (item) openItemModal(item);
  }

  /* ── Wire events ── */
  $("#randomAllBtn").addEventListener("click", function () { randomize(ALL_ITEMS); });
  $("#randomTypeBtn").addEventListener("click", function () { randomize(itemsForTab(currentTab)); });
  $("#helpBtn").addEventListener("click", openHelp);
  $("#closeItemOverlay").addEventListener("click", closeItemModal);
  $("#closeHelpOverlay").addEventListener("click", closeHelp);

  itemOverlay.addEventListener("click", function (e) { if (e.target === itemOverlay) closeItemModal(); });
  helpOverlay.addEventListener("click", function (e) { if (e.target === helpOverlay) closeHelp(); });

  $("#jumpTopBtn").addEventListener("click", function () {
    tabsEl.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeItemModal();
      closeHelp();
    }
  });

  /* ── Init ── */
  statTotal.textContent = ALL_ITEMS.length;
  buildTabs();
  renderAll();
})();
