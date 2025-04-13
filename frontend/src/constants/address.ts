export const ADDRESS_TYPES = {
  WALLET: 1,
  VALIDATOR: 2,
  CONTRACT: 3,
  TREASURY: 4,
};

export const ADDRESS_TYPE_LABELS_JA: Record<number, string> = {
  1: '一般的なウォレットアドレス',
  2: 'ステーキングバリデータ用アドレス',
  3: 'スマートコントラクトアドレス',
  4: '財務・報酬管理用アドレス',
};

export const ADDRESS_TYPE_LABELS_EN: Record<number, string> = {
  1: 'General wallet address',
  2: 'Staking validator address',
  3: 'Smart contract address',
  4: 'Treasury and rewards management address',
};