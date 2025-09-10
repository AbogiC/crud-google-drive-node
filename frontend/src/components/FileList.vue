<template>
  <div class="file-list">
    <h2>Files in Google Drive</h2>
    <button @click="$emit('refresh')" :disabled="loading" class="refresh-btn">
      {{ loading ? "Loading..." : "Refresh" }}
    </button>
    <div v-if="files.length === 0 && !loading" class="no-files">
      No files found
    </div>
    <div v-else class="files-grid">
      <div v-for="file in files" :key="file.id" class="file-item">
        <div class="file-info">
          <h3 @click="previewFile(file)" class="file-name">{{ file.name }}</h3>
          <p>ID: {{ file.id }}</p>
        </div>
        <button @click="$emit('delete', file.id)" class="delete-btn">
          Delete
        </button>
      </div>
    </div>

    <!-- Preview Modal -->
    <div v-if="showPreview" class="preview-modal" @click="closePreview">
      <div class="preview-content" @click.stop>
        <button @click="closePreview" class="close-btn">&times;</button>
        <h3>{{ selectedFile?.name }}</h3>
        <iframe
          :src="`https://drive.google.com/file/d/${selectedFile.id}/preview`"
          width="640"
          height="480"
          allow="autoplay"
        >
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileList",
  props: {
    files: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["refresh", "delete"],
  data() {
    return {
      showPreview: false,
      selectedFile: null,
    };
  },
  methods: {
    previewFile(file) {
      this.selectedFile = file;
      this.showPreview = true;
    },
    closePreview() {
      this.showPreview = false;
      this.selectedFile = null;
    },
    isImage(file) {
      const imageExts = [
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".bmp",
        ".webp",
        ".svg",
      ];
      return imageExts.some((ext) => file.name.toLowerCase().endsWith(ext));
    },
    isAudio(file) {
      const audioExts = [".mp3", ".wav", ".ogg", ".m4a", ".aac", ".flac"];
      return audioExts.some((ext) => file.name.toLowerCase().endsWith(ext));
    },
    isPdf(file) {
      return file.name.toLowerCase().endsWith(".pdf");
    },
  },
};
</script>

<style scoped>
.file-list {
  margin-bottom: 2rem;
}

.refresh-btn {
  background-color: #34a853;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.refresh-btn:hover:not(:disabled) {
  background-color: #2e7d32;
}

.refresh-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.no-files {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 2rem;
}

.files-grid {
  display: grid;
  gap: 1rem;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.file-info h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.file-info p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.delete-btn {
  background-color: #ea4335;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #d33b2c;
}

.file-name {
  cursor: pointer;
  color: #007bff;
}

.file-name:hover {
  text-decoration: underline;
}

.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.preview-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #333;
}

.preview-image img {
  max-width: 100%;
  max-height: 500px;
}

.preview-audio audio {
  width: 100%;
}

.preview-pdf iframe {
  width: 100%;
  height: 600px;
}
</style>
