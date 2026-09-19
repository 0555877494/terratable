/**
 * API Client for Terra & Table
 * Replaces Supabase client with Vercel API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Request failed' };
      }

      return { data };
    } catch (error) {
      return { error: 'Network error' };
    }
  }

  // Products
  async getProducts() {
    return this.request('/products');
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  // Auth
  async login(email: string, password: string) {
    const response = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  }

  async signup(email: string, password: string, name: string, role: string) {
    const response = await this.request<{ token: string; user: any }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role }),
    });

    if (response.data) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Cart
  async getCart() {
    return this.request('/cart');
  }

  async addToCart(productId: string, quantity: number = 1) {
    return this.request('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(itemId: string, quantity: number) {
    return this.request('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ itemId, quantity }),
    });
  }

  async removeFromCart(itemId: string) {
    return this.request('/cart/remove', {
      method: 'DELETE',
      body: JSON.stringify({ itemId }),
    });
  }

  // Orders
  async getOrders() {
    return this.request('/orders');
  }

  async createOrder(orderData: {
    shippingAddress: string;
    paymentMethod: string;
    notes?: string;
    couponCode?: string;
  }) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  // Wishlist
  async getWishlist() {
    return this.request('/wishlist');
  }

  async addToWishlist(productId: string) {
    return this.request('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  }

  async removeFromWishlist(productId: string) {
    return this.request('/wishlist', {
      method: 'DELETE',
      body: JSON.stringify({ productId }),
    });
  }

  // Reviews
  async getReviews(productId: string) {
    return this.request(`/reviews?productId=${productId}`);
  }

  async createReview(productId: string, rating: number, comment: string, images: string[] = []) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify({ productId, rating, comment, images }),
    });
  }

  async markReviewHelpful(reviewId: string) {
    return this.request('/reviews', {
      method: 'PUT',
      body: JSON.stringify({ reviewId }),
    });
  }

  // Loyalty
  async getLoyaltyPoints() {
    return this.request('/loyalty');
  }

  async redeemPoints(points: number, reward: string) {
    return this.request('/loyalty', {
      method: 'POST',
      body: JSON.stringify({ points, reward }),
    });
  }

  // Coupons
  async validateCoupon(code: string, cartTotal: number) {
    return this.request('/coupons', {
      method: 'POST',
      body: JSON.stringify({ code, cartTotal }),
    });
  }

  async applyCoupon(code: string) {
    return this.request('/coupons', {
      method: 'PUT',
      body: JSON.stringify({ code }),
    });
  }
}

export const api = new ApiClient();
export default api;
