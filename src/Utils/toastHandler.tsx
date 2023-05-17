import {IconName} from '@Atom/index';
import {toastProviderRef as toast} from '@Navigators/Application';
import {uuidv4} from './helpers';

export const showToast = (
  title: string,
  type: 'info' | 'success' | 'error' | 'warning' = 'error',
  description?: string,
  iconName?: IconName,
): string => {
  const id = uuidv4();
  toast.current?.show(title, {
    id,
    type,
    data: {
      iconName,
      description,
    },
    onPress: id => {
      toast.current?.hide(id);
    },
  });
  return id;
};

export const hideToast = (id: string) => {
  toast.current?.hide(id);
};

export const updateToast = (
  id: string,
  title: string,
  type: 'info' | 'success' | 'error' | 'warning' = 'error',
  description?: string,
  iconName?: IconName,
) => {
  toast.current?.update(id, title, {
    id,
    type,
    data: {
      iconName,
      description,
    },
    onPress: id => {
      toast.current?.hide(id);
    },
  });
};
