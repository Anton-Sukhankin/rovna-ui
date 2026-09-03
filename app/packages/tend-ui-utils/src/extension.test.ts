import { extension } from './extension';

describe('extension', () => {
  it.each([
    ['helloworld.txt', '.txt'],
    ['HelloWorld.pdf', '.pdf'],
    ['hElOwOrLd.avi', '.avi'],
    ['h_e_l_o_w_o_r_l_d.mp3', '.mp3'],
    ['hello.world.docx', '.docx'],
    ['helloworld', null],
  ] as const)('extracts extension for %s string correctly', (testcase, expected) => {
    const result = extension(testcase);
    expect(result).toBe(expected);
  });
});
