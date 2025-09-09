<template>
  <div id="app">
    <header>
      <h1>Google Drive File Manager</h1>
    </header>
    <main>
      <div class="container">
        <FileList
          @refresh="loadFiles"
          @delete="deleteFile"
          :files="files"
          :loading="loading"
        />
        <FileUpload @uploaded="loadFiles" />
      </div>
    </main>
  </div>
</template>

<script>
import FileList from "./components/FileList.vue";
import FileUpload from "./components/FileUpload.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    FileList,
    FileUpload,
  },
  data() {
    return {
      files: [],
      loading: false,
    };
  },
  mounted() {
    this.loadFiles();
  },
  methods: {
    async loadFiles() {
      this.loading = true;
      try {
        const response = await axios.get("/api/files");
        this.files = response.data.files;
      } catch (error) {
        console.error("Error loading files:", error);
        alert("Error loading files");
      } finally {
        this.loading = false;
      }
    },
    async deleteFile(fileId) {
      if (confirm("Are you sure you want to delete this file?")) {
        try {
          await axios.delete(`/api/files/${fileId}`);
          this.loadFiles();
        } catch (error) {
          console.error("Error deleting file:", error);
          alert("Error deleting file");
        }
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

header {
  background-color: #4285f4;
  color: white;
  padding: 1rem;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin: 0;
}
</style>
