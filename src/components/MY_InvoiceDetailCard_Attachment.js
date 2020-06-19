import React from 'react';
import PropTypes from 'prop-types';
import FilesDropzone from "./FilesDropzone";
import MY_attachmentsBase from "./MY_attachmentsBase";


function MY_InvoiceDetailCard_Attachment({ invoiceId, attachments, handleAttachments, type}) {
  if(type === 'write'){
    return <FilesDropzone
          invoiceId={invoiceId}
          attachments={attachments}
          handleAttachments={handleAttachments}/>
  } else if(type === 'read') {
    return <MY_attachmentsBase
            attachments={attachments.filter(attachment => attachment.invoice === invoiceId)} />
  } else {
    return null;
  }
}

MY_InvoiceDetailCard_Attachment.propTypes = {
  invoiceId: PropTypes.string.isRequired,
  attachments: PropTypes.array.isRequired,
  handleAttachments: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default MY_InvoiceDetailCard_Attachment;
