const {
  hexToBinary, binaryToDecimal, paddLeadingZeroes, getGroups, getGroupsInDecimal, extractHeader,
} = require('./utils');

const createLiteralPacket = ({ typeId, version, val }) => ({ typeId, version, val });
const createOperatorPacket = ({ typeId, version }) => ({ typeId, version, subPackets: [] });
const eatDigits = (digitsArr, amount) => digitsArr.splice(0, amount);

const processOperatorPacket = (binaryDigits, header, parentPacket) => {
  const lengthTypeId = eatDigits(binaryDigits, 1).join('');
  const newParentPacket = createOperatorPacket(header);
  parentPacket.subPackets.push(newParentPacket);

  if (lengthTypeId === '0') { // length
    const binaryNumber = eatDigits(binaryDigits, 15).join('');
    const decimalNumber = binaryToDecimal(binaryNumber);
    const packetsToProcess = binaryDigits.splice(0, decimalNumber);

    processPackets({
      binaryDigits: packetsToProcess,
      parentPacket: newParentPacket,
    });
  }

  if (lengthTypeId === '1') { // steps
    const binaryNumber = eatDigits(binaryDigits, 11).join('');
    const steps = binaryToDecimal(binaryNumber);

    for (let step = 0; step < steps; step++) {
      processPacket({
        binaryDigits,
        parentPacket: newParentPacket,
      });
    }
  }
};

const processLiteralPacket = (binaryDigits, header, parentPacket) => {
  const { groups, sizeToEat } = getGroups(binaryDigits.join(''));
  const sum = getGroupsInDecimal(groups);

  const literalPacket = createLiteralPacket({
    ...header,
    val: sum,
  });
  parentPacket.subPackets.push(literalPacket);
  eatDigits(binaryDigits, sizeToEat);
};

const processPacket = ({ binaryDigits, parentPacket }) => {
  const headerDigits = eatDigits(binaryDigits, 6).join('');
  const header = extractHeader(headerDigits);

  if (header.typeId === 4) {
    processLiteralPacket(binaryDigits, header, parentPacket);
  } else {
    processOperatorPacket(binaryDigits, header, parentPacket);
  }
};

const processPackets = ({ binaryDigits, parentPacket }) => {
  if (!binaryDigits.length) {
    return parentPacket;
  }

  processPacket({ binaryDigits, parentPacket });

  return processPackets({ binaryDigits, parentPacket });
};

const calculatePacket = (packet) => {
  if (packet.typeId === 4) {
    return packet.val;
  }

  const vals = [];
  for (const subPacket of packet.subPackets) {
    const foundVal = calculatePacket(subPacket);
    vals.push(foundVal);
  }

  if (packet.typeId === 0) return vals.reduce((curr, prev) => curr + prev, 0);
  if (packet.typeId === 1) return vals.reduce((curr, prev) => curr * prev, 1);
  if (packet.typeId === 2) return Math.min(...vals);
  if (packet.typeId === 3) return Math.max(...vals);
  if (packet.typeId === 5) return vals[0] > vals[1] ? 1 : 0;
  if (packet.typeId === 6) return vals[0] < vals[1] ? 1 : 0;
  if (packet.typeId === 7) return vals[0] === vals[1] ? 1 : 0;
};

const getVersions = (root) => {
  const versions = [];

  const innerVersion = (packet) => {
    versions.push(packet.version);

    if (Array.isArray(packet.subPackets)) {
      for (const subPacket of packet.subPackets) {
        innerVersion(subPacket);
      }
    }
  };

  innerVersion(root);

  return versions;
};

const getSolutionPart1 = (input) => {
  const binaryDigits = paddLeadingZeroes(hexToBinary(input)).split('');
  const root = { typeId: null, subPackets: [] };

  processPackets({ binaryDigits, parentPacket: root });
  return getVersions(root.subPackets[0]).reduce((acc, curr) => acc + curr, 0);
};

const getSolutionPart2 = (input) => {
  const binaryDigits = paddLeadingZeroes(hexToBinary(input)).split('');
  const root = { typeId: null, subPackets: [] };
  processPackets({ binaryDigits, parentPacket: root });

  return calculatePacket(root.subPackets[0]);
};

module.exports = {
  getSolutionPart1,
  getSolutionPart2,
};
