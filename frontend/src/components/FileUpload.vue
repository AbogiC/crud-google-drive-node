<template>
  <div class="file-upload">
    <h2>Upload File to Google Drive</h2>
    <form @submit.prevent="uploadFile" enctype="multipart/form-data">
      <div class="form-group">
        <label for="file">Select File:</label>
        <input
          type="file"
          id="file"
          @change="handleFileSelect"
          ref="fileInput"
          required
        />
      </div>
      <button type="submit" :disabled="uploading" class="upload-btn">
        {{ uploading ? "Uploading..." : "Upload" }}
      </button>
    </form>
    <div v-if="uploadStatus" class="status">
      {{ uploadStatus }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FileUpload",
  data() {
    return {
      selectedFile: null,
      uploading: false,
      uploadStatus: "",
    };
  },
  methods: {
    handleFileSelect(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadFile() {
      if (!this.selectedFile) return;

      this.uploading = true;
      this.uploadStatus = "";

      const formData = new FormData();
      formData.append("file", this.selectedFile);

      try {
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.uploadStatus = "File uploaded successfully!";
        this.selectedFile = null;
        this.$refs.fileInput.value = "";
        this.$emit("uploaded");
      } catch (error) {
        console.error("Error uploading file:", error);
        this.uploadStatus =
          "Error uploading file: " +
          (error.response?.data?.message || error.message);
      } finally {
        this.uploading = false;
      }
    },
  },
  emits: ["uploaded"],
};
</script>

<style scoped>
.file-upload {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input[type="file"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.upload-btn {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.upload-btn:hover:not(:disabled) {
  background-color: #3367d6;
}

.upload-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.status {
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
}

.status {
  background-color: #e8f5e8;
  color: #2e7d32;
}
</style>
