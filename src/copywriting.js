const CW = {
  toast: {
    success: {
      updateCompanyGeneralInfo: `<span class='fw-bold'>Great!</span> Company data updated.`,
      login: `<span class='fw-bold'>Great!</span> Welcome back, Admin.`,
      upload: `<span class='fw-bold'>Uploaded!</span> File(s) has been uploaded.`,
      deleteFile: `<span class='fw-bold'>Deleted!</span> File(s) has been deleted permanently.`,
    },
    error: {
      updateCompanyGeneralInfo: `<span class='fw-bold'>Uh!</span> It's not your fault. <br /> Let we know.`,
      login: `<span class='fw-bold'>Try again!</span> Email or password is incorrect.`,
      upload: `<span class='fw-bold'>Uh!</span> It's not your fault. <br /> Let we know.`,
      deleteFile: `<span class='fw-bold'>Uh!</span> File(s) still exist, try again. <br /> Let we know.`,
    },
    info: {
      updateCompanyGeneralInfo: `<span class='fw-bold'>Cool.</span> May this help you.`,
      upload: `<span class='fw-bold'>File(s) empty.</span> Drop or click the upload box for adding file(s).`,
    },
    warning: {
      updateCompanyGeneralInfo: `<span class='fw-bold'>Caution!</span> It's better stay away.`,
      upload: `<span class='fw-bold'>Caution!</span> ...`,
    },
  },
  button: {
    submit: {
      uploadImages: 'Upload images',
      uploadVideo: 'Upload video',
      uploadBook: 'Upload PDF book',
      saveUpdateForm: 'Save & update data',
      discardForm: 'Discard changes',
      isUploading: 'Uploading...',
      isSubmitting: 'Submitting...',
    }
  }
}

export default CW
