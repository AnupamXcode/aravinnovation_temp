export const gradients = {
  primary: 'bg-gradient-to-r from-[#f15e1c] to-[#fab60a]',
  secondary: 'bg-gradient-to-r from-[#2e936f] to-[#fab60a]',
  vibrant: 'bg-gradient-to-r from-[#f15e1c] via-[#2e936f] to-[#fab60a]',
  warm: 'bg-gradient-to-r from-[#f15e1c] to-[#f7d7b0]',
  cool: 'bg-gradient-to-r from-[#2e936f] to-[#ffec69]',
};

export function gradientText(type: keyof typeof gradients = 'primary'): string {
  return `${gradients[type]} bg-clip-text text-transparent`;
}
