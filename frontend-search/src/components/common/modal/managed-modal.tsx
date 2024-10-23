'use client';

import Modal from '@components/common/modal/modal';
import dynamic from 'next/dynamic';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
const ForgetPasswordForm = dynamic(
  () => import('@components/auth/forget-password-form')
);

const AddressPopup = dynamic(
  () => import('@components/common/form/add-address')
);

export default function ManagedModal({ lang }: { lang: string }) {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'FORGET_PASSWORD' && <ForgetPasswordForm lang={lang} />}
      {view === 'ADDRESS_VIEW_AND_EDIT' && <AddressPopup lang={lang} />}

    </Modal>
  );
}
