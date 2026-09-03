import { name } from './name';

describe('name', () => {
  it.each([
    ['helloworld.txt', 'helloworld'],
    ['HelloWorld.pdf', 'HelloWorld'],
    ['hElOwOrLd.avi', 'hElOwOrLd'],
    ['h_e_l_o_w_o_r_l_d.mp3', 'h_e_l_o_w_o_r_l_d'],
    ['hello.world.docx', 'hello.world'],
    ['helloworld', 'helloworld'],
    ['', ''],
  ] as const)('returns correct name without extension for %s', (value, expected) => {
    const result = name(value);
    expect(result).toBe(expected);
  });
});
