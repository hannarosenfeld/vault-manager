import { useState } from 'react';

export function EditWarehouseModal({dir, opperation}) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {dir} {opperation}
    </>
  );
}
