export const BASE_HOST_AVATAR_LOW =
  'https://seeds-bucket.s3.ap-southeast-1.amazonaws.com/avatar/3D/Compressed/PNG/';
export const BASE_HOST_AVATAR_HIGH =
  'https://seeds-bucket.s3.ap-southeast-1.amazonaws.com/avatar/3D/';
export const BASE_HOST_AVATAR_NUSANTARA_LOW =
  'https://seeds-bucket.s3.ap-southeast-1.amazonaws.com/avatar/Nusantara/Compressed/Nusantara_';
export const TYPE_HOST_AVATAR_LOW = '.png';
export const TYPE_HOST_AVATAR_HIGH = '.png';
export const TYPE_HOST_AVATAR_NUSANTARA_LOW = '.png';

export const listAssetsAvatarV2 = () => {
  let newData = [];
  for (let i = 1; i < 31; i++) {
    newData.push(`AVATARV2_${i}`);
  }
  return newData;
};

export const listAssetsAvatarV2Nusantara = () => {
  let newData = [];
  for (let i = 1; i < 7; i++) {
    newData.push(`AVATARV2_NUSANTARA_${i}_male`);
    newData.push(`AVATARV2_NUSANTARA_${i}_female`);
  }
  return newData;
};

export const linkAvatarV2 = ({
  id,
  small = true,
}: {
  id: number | string;
  small?: boolean;
}) => {
  let newID = id ? id : 1;
  if (typeof newID === 'string' && newID.length > 4) {
    return `${BASE_HOST_AVATAR_NUSANTARA_LOW}${newID}${TYPE_HOST_AVATAR_NUSANTARA_LOW}`;
  }
  if (!small) {
    return `${BASE_HOST_AVATAR_HIGH}${newID}${TYPE_HOST_AVATAR_HIGH}`;
  }
  return `${BASE_HOST_AVATAR_LOW}Avatar-${
    newID <= 9 ? `0${newID}` : newID
  }${TYPE_HOST_AVATAR_LOW}`;
};
