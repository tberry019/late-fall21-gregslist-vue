<template>
  <div v-if="house.id" class="py-4">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 m-auto">
          <House :house="house" />
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8 m-auto">
          <div class="bg-white rounded p-4 elevation-2">
            <div class="house-details">
              <h3
                class="
                  d-flex
                  align-items-center
                  justify-content-between
                  text-capitalize
                "
              >
                <span>
                  {{ house.year }} {{ house.bedrooms }} - {{ house.bathrooms }}
                </span>
                <span>${{ house.price }}</span>
              </h3>
              <p class="mt-3 pt-3 border-top">
                {{ house.description }}
              </p>
            </div>

            <div class="seller-info mt-3">
              <p>
                <b>Contact Seller</b>
              </p>
              <div class="d-flex clip-text align-items-center">
                <img
                  :src="house.creator.picture"
                  alt=""
                  class="rounded"
                  height="40"
                />
                <b class="ms-3">
                  <i class="mdi mdi-account"></i>
                  {{ house.creator.name }}
                </b>
              </div>
            </div>

            <div
              class="d-flex justify-content-around"
              v-if="house.creatorId == account.id"
            >
              <i
                class="mdi mdi-pencil selectable"
                data-bs-toggle="modal"
                data-bs-target="#edit-modal"
              ></i>
              <button>Delete House</button>
            </div>
            <div>
              <p>Comments:</p>

              <div v-for="h in comments" :key="h.id">
                <p>
                  {{ h.body }} - <img :src="h.creator.picture" height="20" />{{
                    h.creator.name
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal id="edit-modal">
      <template #modal-title>
        {{ house.year }} {{ house.bedrooms }} - {{ house.bathrooms }}
      </template>
      <template #modal-body>
        <HouseForm :house="house" />
      </template>
    </Modal>
  </div>
  <div v-else>loading.....</div>
</template>


<script>
import { onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { housesService } from "../services/HousesService";
import { AppState } from "../AppState";
export default {
  setup() {
    const route = useRoute();
    onMounted(() => {
      housesService.getByid(route.params.id);
    });
    return {
      house: computed(() => AppState.activeHouse),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>