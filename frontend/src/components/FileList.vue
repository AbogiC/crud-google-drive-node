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
          <h3>{{ file.name }}</h3>
          <p>ID: {{ file.id }}</p>
        </div>
        <button @click="$emit('delete', file.id)" class="delete-btn">
          Delete
        </button>
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
</style>
