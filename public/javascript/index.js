(function() {
  window.onload = function() {
    if(document.getElementById('btn')) document.getElementById('btn').addEventListener('change', function() {
      // 上传
      const fileList = this.files;
      const formData = new FormData();
      formData.append('files', fileList[0]);
      fetch('/staticServer/upload', {
        method: 'post',
        body: formData,
      })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.success) window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  }
})();
