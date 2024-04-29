<template>
  <div>
    <div style="margin-top: 6%"></div>
    <el-button style="margin-left: -70%" type="primary" @click="openFullScreen2">
      Check Test
    </el-button>
    <el-row>
      <el-col :span="3">
        <div class="grid-content bg-light"></div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content bg-light" style="margin-top: 5%; margin-left: -80%">
          Monitor
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content bg-light" v-if="dispTitle">
          <el-row type="flex" justify="left" align="middle">
            <el-col :span="4" style="font-size: small">
              <el-result icon="success"> </el-result>
            </el-col>
            <el-col :span="10" >result message...</el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-light"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <div class="grid-content bg-light"></div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content bg-light" type="flex" justify="center" align="middle">
          <video ref="videoElement0" autoplay style="border-radius: 20px">
            <track kind="captions" src="captions.vtt" srclang="en" label="English" />
          </video>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content bg-light" type="flex" justify="center" align="middle">
          <video v-if="disp" ref="videoElement1" autoplay style="border-radius: 20px">
            <track kind="captions" src="captions.vtt" srclang="en" label="English" />
          </video>
          <div>
            <canvas ref="canvas" style="display: none; border-radius: 20px"></canvas>
            <img ref="img" :src="photo" style="border-radius: 20px" alt="Captured Photo" />
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-light"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CamCheck',
  data () {
    return {
      devices: [],
      selectedDevice: null,
      videoStream: null,
      photo: null,
      disp: true,
      dispTitle: false
    }
  },
  async created () {
    await this.getVideoDevices()
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.img.style.visibility = 'hidden'
    })
    this.startCapture()
    setInterval(() => {
      axios
        .post('/srv/GET-MONITOR', {})
        .then((res) => {
          if (res.data.MonitorSig === true) {
            this.openFullScreen2()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }, 1000)
  },
  methods: {
    async getVideoDevices () {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        this.devices = devices.filter((device) => device.kind === 'videoinput')
        if (this.devices.length > 0) {
          this.selectedDevice = this.devices[0].deviceId
        }
      } catch (error) {
        console.error('Error getting video devices:', error)
      }
    },
    async startCapture () {
      try {
        const constraints = {
          video: true
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        this.videoStream = stream
        this.$refs.videoElement0.srcObject = stream
        this.$refs.videoElement1.srcObject = stream
      } catch (error) {
        console.error('Error accessing camera:', error)
      }
    },
    stopCapture () {
      if (this.videoStream) {
        const tracks = this.videoStream.getTracks()
        tracks.forEach((track) => track.stop())
        this.$refs.videoElement.srcObject = null
        this.videoStream = null
      }
    },
    takePhoto () {
      const { canvas } = this.$refs
      // (video);
      canvas.width = this.$refs.videoElement0.videoWidth
      canvas.height = this.$refs.videoElement0.videoHeight
      const context = canvas.getContext('2d')
      context.drawImage(
        this.$refs.videoElement0,
        0,
        0,
        canvas.width,
        canvas.height
      )
      this.photo = canvas.toDataURL('image/png')
      // const blob = this.base64ToBlob(this.photo, 'image/jpeg');
      // 将 Blob 对象保存为文件
      // const link = document.createElement('a');
      // link.href = this.photo;
      // link.download = 'photo.jpg';
      // link.click();
    },
    base64ToBlob (base64Data, contentType) {
      // const contentType = contentType || '';
      const sliceSize = 1024
      const byteCharacters = atob(base64Data)
      const byteArrays = []
      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)
        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i += 1) {
          byteNumbers[i] = slice.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
      }
      return new Blob(byteArrays, { type: contentType })
    },
    openFullScreen2 () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.dispTitle = false
      setTimeout(() => {
        this.disp = false
        this.$refs.img.style.visibility = ''
        this.takePhoto()
        loading.close()
        this.dispTitle = true
      }, 3000)
    }
  }
}
</script>

<style>
.el-row {
  /* margin-bottom: 20px; */
  /* margin-top: 20px; */
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-result {
  transform: scale(0.75);
  margin-top: -30%;
  margin-bottom: -30%;
}
</style>
